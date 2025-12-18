import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobDto, GetJobsDto, GetBookmarkedJobsDto } from './dto';
import { CreateJobResponse, GetJobsResponse, GetJobResponse, BookmarkJobResponse, GetBookmarkedJobsResponse } from './response';

@Injectable()
export class JobService {
  constructor(private readonly prisma: PrismaService) {}

  async createJob(dto: CreateJobDto): Promise<CreateJobResponse> {
    try {
      // Create the job with nested relations
      const job = await this.prisma.job.create({
        data: {
          heading: dto.heading,
          companyName: dto.companyName,
          companyLogoUrl: dto.companyLogoUrl,
          companyDetails: dto.companyDetails,
          lastDateToApply: new Date(dto.lastDateToApply),
          youtubeVideoUrl: dto.youtubeVideoUrl,
          tags: dto.tags || [],
          openings: {
            create: dto.openings || [],
          },
          importantDates: {
            create: (dto.importantDates || []).map((date) => ({
              event: date.event,
              date: new Date(date.date),
            })),
          },
          importantLinks: {
            create: dto.importantLinks || [],
          },
        },
        select: {
          id: true,
          heading: true,
          companyName: true,
          companyLogoUrl: true,
          companyDetails: true,
          lastDateToApply: true,
          youtubeVideoUrl: true,
          tags: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return {
        message: {
          title: 'Success',
          subTitle: 'Job created successfully',
        },
        data: job,
      };
    } catch (error) {
      throw new BadRequestException({
        message: {
          title: 'Job Creation Failed',
          subTitle: 'Failed to create job',
        },
      });
    }
  }

  async getJob(id: string, userId: string): Promise<GetJobResponse> {
    try {
      const job = await this.prisma.job.findUnique({
        where: { id },
        select: {
          id: true,
          heading: true,
          companyName: true,
          companyLogoUrl: true,
          companyDetails: true,
          lastDateToApply: true,
          youtubeVideoUrl: true,
          tags: true,
          createdAt: true,
          updatedAt: true,
          openings: {
            select: {
              nameOfPost: true,
              totalPost: true,
              salary: true,
              jobDetails: true,
              eligibilityCriteria: true,
              location: true,
            },
          },
          importantDates: {
            select: {
              event: true,
              date: true,
            },
          },
          importantLinks: {
            select: {
              name: true,
              link: true,
            },
          },
        },
      });

      if (!job) {
        throw new BadRequestException({
          message: {
            title: 'Not Found',
            subTitle: 'Job not found',
          },
        });
      }

      // Check if job is bookmarked by the user
      const bookmark = await this.prisma.bookmarkJob.findUnique({
        where: {
          userId_jobId: {
            userId,
            jobId: id,
          },
        },
      });

      return {
        message: {
          title: 'Success',
          subTitle: 'Job retrieved successfully',
        },
        data: {
          ...job,
          isBookmarked: !!bookmark,
        },
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Failed to retrieve job',
          subTitle: 'An error occurred while fetching the job',
        },
      });
    }
  }

  async getJobs(dto: GetJobsDto, userId: string): Promise<GetJobsResponse> {
    try {
      const page = dto.page || 1;
      const limit = dto.limit || 10;
      const skip = (page - 1) * limit;

      // Build where clause
      const where: any = {};

      // Search filter - using contains (case-sensitive for MongoDB)
      // For case-insensitive search, we can use raw queries if needed
      if (dto.search) {
        where.OR = [
          { heading: { contains: dto.search } },
          { companyName: { contains: dto.search } },
        ];
      }

      // Tags filter - jobs that have any of the provided tags
      if (dto.tags && dto.tags.length > 0) {
        where.tags = {
          hasSome: dto.tags,
        };
      }

      // Get total count for pagination
      const total = await this.prisma.job.count({ where });

      // Get jobs with openings
      const jobs = await this.prisma.job.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          heading: true,
          companyName: true,
          companyLogoUrl: true,
          lastDateToApply: true,
          tags: true,
          openings: {
            select: {
              totalPost: true,
              location: true,
              salary: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      // Get all bookmarked job IDs for this user
      const bookmarkedJobs = await this.prisma.bookmarkJob.findMany({
        where: {
          userId,
          jobId: {
            in: jobs.map((job) => job.id),
          },
        },
        select: {
          jobId: true,
        },
      });

      const bookmarkedJobIdsSet = new Set(
        bookmarkedJobs.map((bj) => bj.jobId),
      );

      // Transform jobs to include aggregated data and bookmark status
      const transformedJobs = jobs.map((job) => {
        // Calculate total posts
        const totalPost = job.openings.reduce(
          (sum, opening) => sum + opening.totalPost,
          0,
        );

        // Get unique locations
        const locations = [
          ...new Set(job.openings.map((opening) => opening.location)),
        ];

        // Get salary (first opening's salary or concatenated if multiple)
        const salary =
          job.openings.length > 0
            ? job.openings[0].salary
            : 'Not specified';

        return {
          id: job.id,
          heading: job.heading,
          companyName: job.companyName,
          companyLogoUrl: job.companyLogoUrl,
          lastDateToApply: job.lastDateToApply,
          totalPost,
          locations,
          salary,
          tags: job.tags,
          isBookmarked: bookmarkedJobIdsSet.has(job.id),
        };
      });

      const totalPages = Math.ceil(total / limit);

      return {
        message: {
          title: 'Success',
          subTitle: 'Jobs retrieved successfully',
        },
        data: {
          jobs: transformedJobs,
          meta: {
            page,
            limit,
            total,
            totalPages,
          },
        },
      };
    } catch (error) {
      throw new BadRequestException({
        message: {
          title: 'Failed to retrieve jobs',
          subTitle: 'An error occurred while fetching jobs',
        },
      });
    }
  }

  async toggleBookmarkJob(
    jobId: string,
    userId: string,
  ): Promise<BookmarkJobResponse> {
    try {
      // Check if job exists
      const job = await this.prisma.job.findUnique({
        where: { id: jobId },
        select: { id: true },
      });

      if (!job) {
        throw new BadRequestException({
          message: {
            title: 'Job not found',
            subTitle: 'The job you are trying to bookmark does not exist',
          },
        });
      }

      // Check if user has already bookmarked this job
      const existingBookmark = await this.prisma.bookmarkJob.findUnique({
        where: {
          userId_jobId: {
            userId,
            jobId,
          },
        },
      });

      let isBookmarked: boolean;

      if (existingBookmark) {
        // Unbookmark: Remove the bookmark
        await this.prisma.bookmarkJob.delete({
          where: {
            id: existingBookmark.id,
          },
        });

        isBookmarked = false;
      } else {
        // Bookmark: Create the bookmark
        await this.prisma.bookmarkJob.create({
          data: {
            userId,
            jobId,
          },
        });

        isBookmarked = true;
      }

      return {
        message: {
          title: 'Success',
          subTitle: isBookmarked
            ? 'Job bookmarked successfully'
            : 'Job unbookmarked successfully',
        },
        data: {
          jobId,
          isBookmarked,
        },
      }
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Failed to toggle bookmark',
          subTitle: 'An error occurred while toggling the bookmark status',
        },
      });
    }
  }

  async getBookmarkedJobs(
    dto: GetBookmarkedJobsDto,
    userId: string,
  ): Promise<GetBookmarkedJobsResponse> {
    try {
      const page = dto.page || 1;
      const limit = dto.limit || 10;
      const skip = (page - 1) * limit;

      // Get total count of bookmarked jobs for this user
      const total = await this.prisma.bookmarkJob.count({
        where: { userId },
      });

      // Get bookmarked jobs with pagination
      const bookmarkedJobs = await this.prisma.bookmarkJob.findMany({
        where: { userId },
        skip,
        take: limit,
        select: {
          job: {
            select: {
              id: true,
              heading: true,
              companyName: true,
              companyLogoUrl: true,
              lastDateToApply: true,
              tags: true,
              openings: {
                select: {
                  totalPost: true,
                  location: true,
                  salary: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      // Transform jobs to include aggregated data
      const transformedJobs = bookmarkedJobs.map((bookmark) => {
        const job = bookmark.job;

        // Calculate total posts
        const totalPost = job.openings.reduce(
          (sum, opening) => sum + opening.totalPost,
          0,
        );

        // Get unique locations
        const locations = [
          ...new Set(job.openings.map((opening) => opening.location)),
        ];

        // Get salary (first opening's salary or 'Not specified' if no openings)
        const salary =
          job.openings.length > 0
            ? job.openings[0].salary
            : 'Not specified';

        return {
          id: job.id,
          heading: job.heading,
          companyName: job.companyName,
          companyLogoUrl: job.companyLogoUrl,
          lastDateToApply: job.lastDateToApply,
          totalPost,
          locations,
          salary,
          tags: job.tags,
          isBookmarked: true, // All jobs in this list are bookmarked
        };
      });

      const totalPages = Math.ceil(total / limit);

      return {
        message: {
          title: 'Success',
          subTitle: 'Bookmarked jobs retrieved successfully',
        },
        data: {
          jobs: transformedJobs,
          meta: {
            page,
            limit,
            total,
            totalPages,
          },
        },
      };
    } catch (error) {
      throw new BadRequestException({
        message: {
          title: 'Failed to retrieve bookmarked jobs',
          subTitle: 'An error occurred while fetching bookmarked jobs',
        },
      });
    }
  }
}

