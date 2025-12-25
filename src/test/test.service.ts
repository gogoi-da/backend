import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateTestSeriesDto,
  UpdateTestSeriesDto,
  GetTestSeriesDto,
  CreateTestDto,
  UpdateTestDto,
  CreateTestQuestionDto,
  UpdateTestQuestionDto,
  GetTestQuestionsDto,
} from './dto';
import {
  CreateTestSeriesResponse,
  GetTestSeriesResponse,
  GetTestSeriesListResponse,
  UpdateTestSeriesResponse,
  DeleteTestSeriesResponse,
  CreateTestResponse,
  GetTestResponse,
  GetTestsListResponse,
  UpdateTestResponse,
  DeleteTestResponse,
  CreateTestQuestionResponse,
  GetTestQuestionResponse,
  GetTestQuestionsListResponse,
  UpdateTestQuestionResponse,
  DeleteTestQuestionResponse,
  LikeTestSeriesResponse,
} from './response';

@Injectable()
export class TestService {
  constructor(private readonly prisma: PrismaService) {}

  async createTestSeries(
    dto: CreateTestSeriesDto,
  ): Promise<CreateTestSeriesResponse> {
    try {
      const testSeries = await this.prisma.testSeries.create({
        data: {
          examId: dto.examId,
          name: dto.name,
          organization: dto.organization,
          description: dto.description,
          image: dto.image,
          isPremium: dto.isPremium ?? false,
          isActive: dto.isActive ?? true,
        },
        select: {
          id: true,
          examId: true,
          name: true,
          organization: true,
          description: true,
          image: true,
          isPremium: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return {
        message: {
          title: 'Success',
          subTitle: 'Test series created successfully',
        },
        data: testSeries,
      };
    } catch (error) {
      throw new BadRequestException({
        message: {
          title: 'Test Series Creation Failed',
          subTitle: 'Failed to create test series',
        },
      });
    }
  }

  async getTestSeries(id: string): Promise<GetTestSeriesResponse> {
    try {
      const testSeries = await this.prisma.testSeries.findUnique({
        where: { id },
        select: {
          id: true,
          examId: true,
          name: true,
          organization: true,
          description: true,
          image: true,
          isPremium: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!testSeries) {
        throw new NotFoundException({
          message: {
            title: 'Not Found',
            subTitle: 'Test series not found',
          },
        });
      }

      return {
        message: {
          title: 'Success',
          subTitle: 'Test series retrieved successfully',
        },
        data: testSeries,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Failed to retrieve test series',
          subTitle: 'An error occurred while fetching the test series',
        },
      });
    }
  }

  async getTestSeriesList(
    dto: GetTestSeriesDto,
    userId: string,
  ): Promise<GetTestSeriesListResponse> {
    try {
      // Get test series filtered by examId with count of tests
      const testSeriesData = await this.prisma.testSeries.findMany({
        where: {
          examId: dto.examId,
        },
        select: {
          id: true,
          examId: true,
          name: true,
          organization: true,
          description: true,
          image: true,
          isPremium: true,
          isActive: true,
          likeCount: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              tests: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      // Get all liked test series IDs for this user
      const likedTestSeries = await this.prisma.likeTestSeries.findMany({
        where: {
          userId,
          testSeriesId: {
            in: testSeriesData.map((series) => series.id),
          },
        },
        select: {
          testSeriesId: true,
        },
      });

      const likedTestSeriesIdsSet = new Set(
        likedTestSeries.map((lts) => lts.testSeriesId),
      );

      // Transform data to include totalTests count, isLiked, and totalLikes
      const testSeries = testSeriesData.map((series) => ({
        id: series.id,
        examId: series.examId,
        name: series.name,
        organization: series.organization,
        description: series.description,
        image: series.image,
        isPremium: series.isPremium,
        totalTests: series._count.tests,
        isActive: series.isActive,
        isLiked: likedTestSeriesIdsSet.has(series.id),
        totalLikes: series.likeCount ?? 0,
        createdAt: series.createdAt,
        updatedAt: series.updatedAt,
      }));

      return {
        message: {
          title: 'Success',
          subTitle: 'Test series retrieved successfully',
        },
        data: {
          testSeries,
        },
      };
    } catch (error) {
      console.error('Error fetching test series:', error);
      throw new BadRequestException({
        message: {
          title: 'Failed to retrieve test series',
          subTitle: 'An error occurred while fetching test series',
        },
      });
    }
  }

  async updateTestSeries(
    id: string,
    dto: UpdateTestSeriesDto,
  ): Promise<UpdateTestSeriesResponse> {
    try {
      // Check if test series exists
      const existing = await this.prisma.testSeries.findUnique({
        where: { id },
      });

      if (!existing) {
        throw new NotFoundException({
          message: {
            title: 'Not Found',
            subTitle: 'Test series not found',
          },
        });
      }

      // Build update data object
      const updateData: any = {};
      if (dto.examId !== undefined) updateData.examId = dto.examId;
      if (dto.name !== undefined) updateData.name = dto.name;
      if (dto.organization !== undefined) updateData.organization = dto.organization;
      if (dto.description !== undefined) updateData.description = dto.description;
      if (dto.image !== undefined) updateData.image = dto.image;
      if (dto.isPremium !== undefined) updateData.isPremium = dto.isPremium;
      if (dto.isActive !== undefined) updateData.isActive = dto.isActive;

      const testSeries = await this.prisma.testSeries.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          examId: true,
          name: true,
          organization: true,
          description: true,
          image: true,
          isPremium: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return {
        message: {
          title: 'Success',
          subTitle: 'Test series updated successfully',
        },
        data: testSeries,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Test Series Update Failed',
          subTitle: 'Failed to update test series',
        },
      });
    }
  }

  async deleteTestSeries(id: string): Promise<DeleteTestSeriesResponse> {
    try {
      // Check if test series exists
      const existing = await this.prisma.testSeries.findUnique({
        where: { id },
      });

      if (!existing) {
        throw new NotFoundException({
          message: {
            title: 'Not Found',
            subTitle: 'Test series not found',
          },
        });
      }

      await this.prisma.testSeries.delete({
        where: { id },
      });

      return {
        message: {
          title: 'Success',
          subTitle: 'Test series deleted successfully',
        },
        data: { id },
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Test Series Deletion Failed',
          subTitle: 'Failed to delete test series',
        },
      });
    }
  }

  async createTest(dto: CreateTestDto): Promise<CreateTestResponse> {
    try {
      const test = await this.prisma.test.create({
        data: {
          testSeriesId: dto.testSeriesId,
          name: dto.name,
          description: dto.description,
          duration: dto.duration ?? 0,
          totalMarks: dto.totalMarks ?? 0,
          totalQuestions: dto.totalQuestions ?? 0,
          passingMarks: dto.passingMarks,
          difficulty: dto.difficulty,
          isPremium: dto.isPremium ?? false,
          isActive: dto.isActive ?? true,
        },
        select: {
          id: true,
          testSeriesId: true,
          name: true,
          description: true,
          duration: true,
          totalMarks: true,
          totalQuestions: true,
          passingMarks: true,
          difficulty: true,
          isPremium: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return {
        message: {
          title: 'Success',
          subTitle: 'Test created successfully',
        },
        data: test,
      };
    } catch (error) {
      throw new BadRequestException({
        message: {
          title: 'Test Creation Failed',
          subTitle: 'Failed to create test',
        },
      });
    }
  }

  async getTest(id: string): Promise<GetTestResponse> {
    try {
      const test = await this.prisma.test.findUnique({
        where: { id },
        select: {
          id: true,
          testSeriesId: true,
          name: true,
          description: true,
          duration: true,
          totalMarks: true,
          totalQuestions: true,
          passingMarks: true,
          difficulty: true,
          isPremium: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!test) {
        throw new NotFoundException({
          message: {
            title: 'Not Found',
            subTitle: 'Test not found',
          },
        });
      }

      return {
        message: {
          title: 'Success',
          subTitle: 'Test retrieved successfully',
        },
        data: test,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Failed to retrieve test',
          subTitle: 'An error occurred while fetching the test',
        },
      });
    }
  }

  async getTestsList(testSeriesId: string): Promise<GetTestsListResponse> {
    try {
      // Get tests filtered by testSeriesId
      const tests = await this.prisma.test.findMany({
        where: {
          testSeriesId,
        },
        select: {
          id: true,
          testSeriesId: true,
          name: true,
          description: true,
          duration: true,
          totalMarks: true,
          totalQuestions: true,
          passingMarks: true,
          difficulty: true,
          isPremium: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return {
        message: {
          title: 'Success',
          subTitle: 'Tests retrieved successfully',
        },
        data: {
          tests,
        },
      };
    } catch (error) {
      throw new BadRequestException({
        message: {
          title: 'Failed to retrieve tests',
          subTitle: 'An error occurred while fetching tests',
        },
      });
    }
  }

  async updateTest(id: string, dto: UpdateTestDto): Promise<UpdateTestResponse> {
    try {
      // Check if test exists
      const existing = await this.prisma.test.findUnique({
        where: { id },
      });

      if (!existing) {
        throw new NotFoundException({
          message: {
            title: 'Not Found',
            subTitle: 'Test not found',
          },
        });
      }

      // Build update data object
      const updateData: any = {};
      if (dto.testSeriesId !== undefined) updateData.testSeriesId = dto.testSeriesId;
      if (dto.name !== undefined) updateData.name = dto.name;
      if (dto.description !== undefined) updateData.description = dto.description;
      if (dto.duration !== undefined) updateData.duration = dto.duration;
      if (dto.totalMarks !== undefined) updateData.totalMarks = dto.totalMarks;
      if (dto.totalQuestions !== undefined) updateData.totalQuestions = dto.totalQuestions;
      if (dto.passingMarks !== undefined) updateData.passingMarks = dto.passingMarks;
      if (dto.difficulty !== undefined) updateData.difficulty = dto.difficulty;
      if (dto.isPremium !== undefined) updateData.isPremium = dto.isPremium;
      if (dto.isActive !== undefined) updateData.isActive = dto.isActive;

      const test = await this.prisma.test.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          testSeriesId: true,
          name: true,
          description: true,
          duration: true,
          totalMarks: true,
          totalQuestions: true,
          passingMarks: true,
          difficulty: true,
          isPremium: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return {
        message: {
          title: 'Success',
          subTitle: 'Test updated successfully',
        },
        data: test,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Test Update Failed',
          subTitle: 'Failed to update test',
        },
      });
    }
  }

  async deleteTest(id: string): Promise<DeleteTestResponse> {
    try {
      // Check if test exists
      const existing = await this.prisma.test.findUnique({
        where: { id },
      });

      if (!existing) {
        throw new NotFoundException({
          message: {
            title: 'Not Found',
            subTitle: 'Test not found',
          },
        });
      }

      await this.prisma.test.delete({
        where: { id },
      });

      return {
        message: {
          title: 'Success',
          subTitle: 'Test deleted successfully',
        },
        data: { id },
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Test Deletion Failed',
          subTitle: 'Failed to delete test',
        },
      });
    }
  }

  async createTestQuestion(
    dto: CreateTestQuestionDto,
  ): Promise<CreateTestQuestionResponse> {
    try {
      // Verify test exists
      const test = await this.prisma.test.findUnique({
        where: { id: dto.testId },
      });

      if (!test) {
        throw new NotFoundException({
          message: {
            title: 'Test Not Found',
            subTitle: `Test with ID ${dto.testId} does not exist`,
          },
        });
      }

      const testQuestion = await this.prisma.testQuestion.create({
        data: {
          testId: dto.testId,
          questionId: dto.questionId,
          type: dto.type,
          statement: dto.statement,
          tag: dto.tag,
          language: dto.language ?? 'en',
          metadata: dto.metadata,
          marks: dto.marks ?? 1,
          expectedTime: dto.expectedTime,
          order: dto.order ?? 0,
          isActive: dto.isActive ?? true,
        },
        select: {
          id: true,
          testId: true,
          questionId: true,
          type: true,
          statement: true,
          tag: true,
          language: true,
          metadata: true,
          marks: true,
          expectedTime: true,
          order: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      // Update test totalMarks, totalQuestions, and duration by recalculating from all questions
      const allQuestions = await this.prisma.testQuestion.findMany({
        where: { testId: dto.testId },
        select: { marks: true, expectedTime: true },
      });

      const totalMarks = allQuestions.reduce(
        (sum, q) => sum + (q.marks || 0),
        0,
      );
      const totalQuestions = allQuestions.length;
      const totalDuration = allQuestions.reduce(
        (sum, q) =>
          sum + (q.expectedTime ? Math.ceil(q.expectedTime / 60) : 0),
        0,
      );

      await this.prisma.test.update({
        where: { id: dto.testId },
        data: {
          totalMarks,
          totalQuestions,
          duration: totalDuration,
        },
      });

      return {
        message: {
          title: 'Success',
          subTitle: 'Test question created successfully',
        },
        data: testQuestion,
      };
    } catch (error) {
      console.error('Error creating test question:', error);
      
      // Re-throw NotFoundException
      if (error instanceof NotFoundException) {
        throw error;
      }
      
      // Check for specific Prisma errors
      if (error.code === 'P2003') {
        throw new BadRequestException({
          message: {
            title: 'Test Question Creation Failed',
            subTitle: 'The test ID does not exist',
          },
        });
      }
      
      if (error.code === 'P2002') {
        throw new BadRequestException({
          message: {
            title: 'Test Question Creation Failed',
            subTitle: 'A question with this data already exists',
          },
        });
      }

      throw new BadRequestException({
        message: {
          title: 'Test Question Creation Failed',
          subTitle: error.message || 'Failed to create test question',
        },
      });
    }
  }

  async getTestQuestion(id: string): Promise<GetTestQuestionResponse> {
    try {
      const testQuestion = await this.prisma.testQuestion.findUnique({
        where: { id },
        select: {
          id: true,
          testId: true,
          questionId: true,
          type: true,
          statement: true,
          tag: true,
          language: true,
          metadata: true,
          marks: true,
          expectedTime: true,
          order: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!testQuestion) {
        throw new NotFoundException({
          message: {
            title: 'Not Found',
            subTitle: 'Test question not found',
          },
        });
      }

      return {
        message: {
          title: 'Success',
          subTitle: 'Test question retrieved successfully',
        },
        data: testQuestion,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Failed to retrieve test question',
          subTitle: 'An error occurred while fetching the test question',
        },
      });
    }
  }

  async getTestQuestionsList(
    testId: string,
    userId: string,
    dto: GetTestQuestionsDto,
  ): Promise<GetTestQuestionsListResponse> {
    try {
      // Get user's language preference
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { language: true },
      });

      const userLanguage = user?.language || 'en';

      const page = dto.page || 1;
      const limit = dto.limit || 10;
      const skip = (page - 1) * limit;

      // Get total count for pagination
      const total = await this.prisma.testQuestion.count({
        where: {
          testId,
          language: userLanguage, // Filter by user's language
        },
      });

      // Get test questions filtered by testId and user's language with pagination
      const questions = await this.prisma.testQuestion.findMany({
        where: {
          testId,
          language: userLanguage, // Filter by user's language
        },
        select: {
          id: true,
          testId: true,
          questionId: true,
          type: true,
          statement: true,
          tag: true,
          language: true,
          metadata: true,
          marks: true,
          expectedTime: true,
          order: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          order: 'asc',
        },
        skip,
        take: limit,
      });

      const totalPages = Math.ceil(total / limit);

      return {
        message: {
          title: 'Success',
          subTitle: 'Test questions retrieved successfully',
        },
        data: {
          questions,
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
          title: 'Failed to retrieve test questions',
          subTitle: 'An error occurred while fetching test questions',
        },
      });
    }
  }

  async updateTestQuestion(
    id: string,
    dto: UpdateTestQuestionDto,
  ): Promise<UpdateTestQuestionResponse> {
    try {
      // Check if test question exists
      const existing = await this.prisma.testQuestion.findUnique({
        where: { id },
      });

      if (!existing) {
        throw new NotFoundException({
          message: {
            title: 'Not Found',
            subTitle: 'Test question not found',
          },
        });
      }

      // Build update data object
      const updateData: any = {};
      if (dto.testId !== undefined) updateData.testId = dto.testId;
      if (dto.questionId !== undefined) updateData.questionId = dto.questionId;
      if (dto.type !== undefined) updateData.type = dto.type;
      if (dto.statement !== undefined) updateData.statement = dto.statement;
      if (dto.tag !== undefined) updateData.tag = dto.tag;
      if (dto.language !== undefined) updateData.language = dto.language;
      if (dto.metadata !== undefined) updateData.metadata = dto.metadata;
      if (dto.marks !== undefined) updateData.marks = dto.marks;
      if (dto.expectedTime !== undefined)
        updateData.expectedTime = dto.expectedTime;
      if (dto.order !== undefined) updateData.order = dto.order;
      if (dto.isActive !== undefined) updateData.isActive = dto.isActive;

      const testQuestion = await this.prisma.testQuestion.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          testId: true,
          questionId: true,
          type: true,
          statement: true,
          tag: true,
          language: true,
          metadata: true,
          marks: true,
          expectedTime: true,
          order: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      // Update test totalMarks, totalQuestions, and duration if marks or expectedTime changed
      if (dto.marks !== undefined || dto.expectedTime !== undefined) {
        const allQuestions = await this.prisma.testQuestion.findMany({
          where: { testId: testQuestion.testId },
          select: { marks: true, expectedTime: true },
        });

        const totalMarks = allQuestions.reduce(
          (sum, q) => sum + (q.marks || 0),
          0,
        );
        const totalQuestions = allQuestions.length;
        const totalDuration = allQuestions.reduce(
          (sum, q) =>
            sum + (q.expectedTime ? Math.ceil(q.expectedTime / 60) : 0),
          0,
        );

        await this.prisma.test.update({
          where: { id: testQuestion.testId },
          data: {
            totalMarks,
            totalQuestions,
            duration: totalDuration,
          },
        });
      }

      return {
        message: {
          title: 'Success',
          subTitle: 'Test question updated successfully',
        },
        data: testQuestion,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Test Question Update Failed',
          subTitle: 'Failed to update test question',
        },
      });
    }
  }

  async deleteTestQuestion(
    id: string,
  ): Promise<DeleteTestQuestionResponse> {
    try {
      // Check if test question exists
      const existing = await this.prisma.testQuestion.findUnique({
        where: { id },
        select: { testId: true, marks: true, expectedTime: true },
      });

      if (!existing) {
        throw new NotFoundException({
          message: {
            title: 'Not Found',
            subTitle: 'Test question not found',
          },
        });
      }

      await this.prisma.testQuestion.delete({
        where: { id },
      });

      // Update test totalMarks, totalQuestions, and duration after question deletion
      const allQuestions = await this.prisma.testQuestion.findMany({
        where: { testId: existing.testId },
        select: { marks: true, expectedTime: true },
      });

      const totalMarks = allQuestions.reduce(
        (sum, q) => sum + (q.marks || 0),
        0,
      );
      const totalQuestions = allQuestions.length;
      const totalDuration = allQuestions.reduce(
        (sum, q) =>
          sum + (q.expectedTime ? Math.ceil(q.expectedTime / 60) : 0),
        0,
      );

      await this.prisma.test.update({
        where: { id: existing.testId },
        data: {
          totalMarks,
          totalQuestions,
          duration: totalDuration,
        },
      });

      return {
        message: {
          title: 'Success',
          subTitle: 'Test question deleted successfully',
        },
        data: { id },
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Test Question Deletion Failed',
          subTitle: 'Failed to delete test question',
        },
      });
    }
  }

  async toggleLikeTestSeries(
    testSeriesId: string,
    userId: string,
  ): Promise<LikeTestSeriesResponse> {
    try {
      // Check if test series exists
      const testSeries = await this.prisma.testSeries.findUnique({
        where: { id: testSeriesId },
        select: { id: true, likeCount: true },
      });

      if (!testSeries) {
        throw new BadRequestException({
          message: {
            title: 'Test Series not found',
            subTitle: 'The test series you are trying to like does not exist',
          },
        });
      }

      // Check if user has already liked this test series
      const existingLike = await this.prisma.likeTestSeries.findUnique({
        where: {
          userId_testSeriesId: {
            userId,
            testSeriesId,
          },
        },
      });

      let isLiked: boolean;
      let newLikeCount: number;

      if (existingLike) {
        // Unlike: Remove the like and decrement count
        await this.prisma.likeTestSeries.delete({
          where: {
            id: existingLike.id,
          },
        });

        // Decrement likeCount atomically (handle null case)
        const currentLikeCount = testSeries.likeCount ?? 0;
        const updatedTestSeries = await this.prisma.testSeries.update({
          where: { id: testSeriesId },
          data: {
            likeCount: Math.max(0, currentLikeCount - 1),
          },
          select: { likeCount: true },
        });

        isLiked = false;
        newLikeCount = updatedTestSeries.likeCount;
      } else {
        // Like: Create the like and increment count
        await this.prisma.likeTestSeries.create({
          data: {
            userId,
            testSeriesId,
          },
        });

        // Increment likeCount atomically (handle null case)
        const currentLikeCount = testSeries.likeCount ?? 0;
        const updatedTestSeries = await this.prisma.testSeries.update({
          where: { id: testSeriesId },
          data: {
            likeCount: currentLikeCount + 1,
          },
          select: { likeCount: true },
        });

        isLiked = true;
        newLikeCount = updatedTestSeries.likeCount;
      }

      return {
        message: {
          title: 'Success',
          subTitle: isLiked
            ? 'Test series liked successfully'
            : 'Test series unliked successfully',
        },
        data: {
          testSeriesId,
          isLiked,
          likeCount: newLikeCount,
        },
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Failed to toggle like',
          subTitle: 'An error occurred while toggling the like status',
        },
      });
    }
  }
}
