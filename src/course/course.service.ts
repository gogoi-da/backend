import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateExamDto,
  UpdateExamDto,
  GetExamsDto,
  CreateSubjectDto,
  UpdateSubjectDto,
  GetSubjectsDto,
  CreateLessonDto,
  UpdateLessonDto,
  GetLessonsDto,
  CreateQuestionDto,
  UpdateQuestionDto,
  GetQuestionsDto,
  CreateNotificationDto,
  UpdateNotificationDto,
  GetNotificationsDto,
  GetQuestionsByLessonDto,
} from './dto';
import {
  CreateExamResponse,
  GetExamResponse,
  GetExamsResponse,
  UpdateExamResponse,
  DeleteExamResponse,
  CreateSubjectResponse,
  GetSubjectResponse,
  GetSubjectsResponse,
  UpdateSubjectResponse,
  DeleteSubjectResponse,
  CreateLessonResponse,
  GetLessonResponse,
  GetLessonsResponse,
  UpdateLessonResponse,
  DeleteLessonResponse,
  CreateQuestionResponse,
  GetQuestionResponse,
  GetQuestionsResponse,
  UpdateQuestionResponse,
  DeleteQuestionResponse,
  CreateNotificationResponse,
  GetNotificationResponse,
  GetNotificationsResponse,
  UpdateNotificationResponse,
  DeleteNotificationResponse,
  GetExamDetailsResponse,
  LikeExamResponse,
  GetLessonsBySubjectResponse,
  GetQuestionsByLessonResponse,
  BookmarkQuestionResponse,
} from './response';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async createExam(dto: CreateExamDto): Promise<CreateExamResponse> {
    try {
      const exam = await this.prisma.exam.create({
        data: {
          name: dto.name,
          organization: dto.organization,
          image: dto.image,
          description: dto.description,
          price: dto.price ?? 0,
          totalQuestion: dto.totalQuestion ?? 0,
          totalMockTests: dto.totalMockTests ?? 0,
          rating: dto.rating ?? 0,
        },
        select: {
          id: true,
          name: true,
          organization: true,
          image: true,
          description: true,
          price: true,
          totalQuestion: true,
          totalMockTests: true,
          rating: true,
          likeCount: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return {
        message: {
          title: 'Success',
          subTitle: 'Exam created successfully',
        },
        data: exam,
      };
    } catch (error) {
      throw new BadRequestException({
        message: {
          title: 'Exam Creation Failed',
          subTitle: 'Failed to create exam',
        },
      });
    }
  }

  async getExam(id: string): Promise<GetExamResponse> {
    try {
      const exam = await this.prisma.exam.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          organization: true,
          image: true,
          description: true,
          price: true,
          totalQuestion: true,
          totalMockTests: true,
          rating: true,
          likeCount: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!exam) {
        throw new BadRequestException({
          message: {
            title: 'Not Found',
            subTitle: 'Exam not found',
          },
        });
      }

      return {
        message: {
          title: 'Success',
          subTitle: 'Exam retrieved successfully',
        },
        data: exam,
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Failed to retrieve exam',
          subTitle: 'An error occurred while fetching the exam',
        },
      });
    }
  }

  async getExams(dto: GetExamsDto): Promise<GetExamsResponse> {
    try {
      const page = dto.page || 1;
      const limit = dto.limit || 10;
      const skip = (page - 1) * limit;

      // Build where clause
      const where: any = {};

      // Search filter
      if (dto.search) {
        where.OR = [
          { name: { contains: dto.search } },
          { organization: { contains: dto.search } },
        ];
      }

      // Get total count for pagination
      const total = await this.prisma.exam.count({ where });

      // Get exams
      const exams = await this.prisma.exam.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          organization: true,
          image: true,
          description: true,
          price: true,
          totalQuestion: true,
          totalMockTests: true,
          rating: true,
          likeCount: true,
          isActive: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const totalPages = Math.ceil(total / limit);

      return {
        message: {
          title: 'Success',
          subTitle: 'Exams retrieved successfully',
        },
        data: {
          exams,
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
          title: 'Failed to retrieve exams',
          subTitle: 'An error occurred while fetching exams',
        },
      });
    }
  }

  async updateExam(id: string, dto: UpdateExamDto): Promise<UpdateExamResponse> {
    try {
      // Check if exam exists
      const existingExam = await this.prisma.exam.findUnique({
        where: { id },
      });

      if (!existingExam) {
        throw new BadRequestException({
          message: {
            title: 'Not Found',
            subTitle: 'Exam not found',
          },
        });
      }

      // Build update data object
      const updateData: any = {};
      if (dto.name !== undefined) updateData.name = dto.name;
      if (dto.organization !== undefined) updateData.organization = dto.organization;
      if (dto.image !== undefined) updateData.image = dto.image;
      if (dto.description !== undefined) updateData.description = dto.description;
      if (dto.price !== undefined) updateData.price = dto.price;
      if (dto.totalQuestion !== undefined) updateData.totalQuestion = dto.totalQuestion;
      if (dto.totalMockTests !== undefined) updateData.totalMockTests = dto.totalMockTests;
      if (dto.rating !== undefined) updateData.rating = dto.rating;
      if (dto.isActive !== undefined) updateData.isActive = dto.isActive;

      const exam = await this.prisma.exam.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          name: true,
          organization: true,
          image: true,
          description: true,
          price: true,
          totalQuestion: true,
          totalMockTests: true,
          rating: true,
          likeCount: true,
          isActive: true,
          updatedAt: true,
        },
      });

      return {
        message: {
          title: 'Success',
          subTitle: 'Exam updated successfully',
        },
        data: exam,
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Failed to update exam',
          subTitle: 'An error occurred while updating the exam',
        },
      });
    }
  }

  async deleteExam(id: string): Promise<DeleteExamResponse> {
    try {
      // Check if exam exists
      const existingExam = await this.prisma.exam.findUnique({
        where: { id },
      });

      if (!existingExam) {
        throw new BadRequestException({
          message: {
            title: 'Not Found',
            subTitle: 'Exam not found',
          },
        });
      }

      // Delete the exam (cascade will handle related records)
      await this.prisma.exam.delete({
        where: { id },
      });

      return {
        message: {
          title: 'Success',
          subTitle: 'Exam deleted successfully',
        },
        data: { id },
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Failed to delete exam',
          subTitle: 'An error occurred while deleting the exam',
        },
      });
    }
  }

  // Subject CRUD operations
  async createSubject(dto: CreateSubjectDto): Promise<CreateSubjectResponse> {
    try {
      // Verify exam exists
      const exam = await this.prisma.exam.findUnique({
        where: { id: dto.examId },
      });

      if (!exam) {
        throw new BadRequestException({
          message: {
            title: 'Not Found',
            subTitle: 'Exam not found',
          },
        });
      }

      const subject = await this.prisma.subject.create({
        data: {
          examId: dto.examId,
          name: dto.name,
          description: dto.description,
          isPremium: dto.isPremium ?? false,
        },
        select: {
          id: true,
          examId: true,
          name: true,
          description: true,
          isPremium: true,
          lessonCount: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return {
        message: {
          title: 'Success',
          subTitle: 'Subject created successfully',
        },
        data: subject,
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Subject Creation Failed',
          subTitle: 'Failed to create subject',
        },
      });
    }
  }

  async getSubject(id: string): Promise<GetSubjectResponse> {
    try {
      const subject = await this.prisma.subject.findUnique({
        where: { id },
        select: {
          id: true,
          examId: true,
          name: true,
          description: true,
          isPremium: true,
          lessonCount: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!subject) {
        throw new BadRequestException({
          message: {
            title: 'Not Found',
            subTitle: 'Subject not found',
          },
        });
      }

      return {
        message: {
          title: 'Success',
          subTitle: 'Subject retrieved successfully',
        },
        data: subject,
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Failed to retrieve subject',
          subTitle: 'An error occurred while fetching the subject',
        },
      });
    }
  }

  async getSubjects(dto: GetSubjectsDto): Promise<GetSubjectsResponse> {
    try {
      const page = dto.page || 1;
      const limit = dto.limit || 10;
      const skip = (page - 1) * limit;

      const where: any = {};

      if (dto.examId) {
        where.examId = dto.examId;
      }

      if (dto.search) {
        where.name = { contains: dto.search };
      }

      const total = await this.prisma.subject.count({ where });

      const subjects = await this.prisma.subject.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          examId: true,
          name: true,
          description: true,
          isPremium: true,
          lessonCount: true,
          isActive: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const totalPages = Math.ceil(total / limit);

      return {
        message: {
          title: 'Success',
          subTitle: 'Subjects retrieved successfully',
        },
        data: {
          subjects,
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
          title: 'Failed to retrieve subjects',
          subTitle: 'An error occurred while fetching subjects',
        },
      });
    }
  }

  async updateSubject(
    id: string,
    dto: UpdateSubjectDto,
  ): Promise<UpdateSubjectResponse> {
    try {
      const existingSubject = await this.prisma.subject.findUnique({
        where: { id },
      });

      if (!existingSubject) {
        throw new BadRequestException({
          message: {
            title: 'Not Found',
            subTitle: 'Subject not found',
          },
        });
      }

      const updateData: any = {};
      if (dto.name !== undefined) updateData.name = dto.name;
      if (dto.description !== undefined) updateData.description = dto.description;
      if (dto.isPremium !== undefined) updateData.isPremium = dto.isPremium;
      if (dto.isActive !== undefined) updateData.isActive = dto.isActive;

      const subject = await this.prisma.subject.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          name: true,
          description: true,
          isPremium: true,
          lessonCount: true,
          isActive: true,
          updatedAt: true,
        },
      });

      return {
        message: {
          title: 'Success',
          subTitle: 'Subject updated successfully',
        },
        data: subject,
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Failed to update subject',
          subTitle: 'An error occurred while updating the subject',
        },
      });
    }
  }

  async deleteSubject(id: string): Promise<DeleteSubjectResponse> {
    try {
      const existingSubject = await this.prisma.subject.findUnique({
        where: { id },
      });

      if (!existingSubject) {
        throw new BadRequestException({
          message: {
            title: 'Not Found',
            subTitle: 'Subject not found',
          },
        });
      }

      await this.prisma.subject.delete({
        where: { id },
      });

      return {
        message: {
          title: 'Success',
          subTitle: 'Subject deleted successfully',
        },
        data: { id },
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Failed to delete subject',
          subTitle: 'An error occurred while deleting the subject',
        },
      });
    }
  }

  // Lesson CRUD operations
  async createLesson(dto: CreateLessonDto): Promise<CreateLessonResponse> {
    try {
      // Verify subject exists
      const subject = await this.prisma.subject.findUnique({
        where: { id: dto.subjectId },
      });

      if (!subject) {
        throw new BadRequestException({
          message: {
            title: 'Not Found',
            subTitle: 'Subject not found',
          },
        });
      }

      const lesson = await this.prisma.lesson.create({
        data: {
          subjectId: dto.subjectId,
          name: dto.name,
          description: dto.description,
          tags: dto.tags || [],
          totalTime: dto.totalTime,
        },
        select: {
          id: true,
          subjectId: true,
          name: true,
          description: true,
          tags: true,
          questionCount: true,
          totalTime: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      // Update subject's lessonCount
      await this.prisma.subject.update({
        where: { id: dto.subjectId },
        data: {
          lessonCount: {
            increment: 1,
          },
        },
      });

      return {
        message: {
          title: 'Success',
          subTitle: 'Lesson created successfully',
        },
        data: lesson,
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Lesson Creation Failed',
          subTitle: 'Failed to create lesson',
        },
      });
    }
  }

  async getLesson(id: string): Promise<GetLessonResponse> {
    try {
      const lesson = await this.prisma.lesson.findUnique({
        where: { id },
        select: {
          id: true,
          subjectId: true,
          name: true,
          description: true,
          tags: true,
          questionCount: true,
          totalTime: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!lesson) {
        throw new BadRequestException({
          message: {
            title: 'Not Found',
            subTitle: 'Lesson not found',
          },
        });
      }

      return {
        message: {
          title: 'Success',
          subTitle: 'Lesson retrieved successfully',
        },
        data: lesson,
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Failed to retrieve lesson',
          subTitle: 'An error occurred while fetching the lesson',
        },
      });
    }
  }

  async getLessons(dto: GetLessonsDto): Promise<GetLessonsResponse> {
    try {
      const page = dto.page || 1;
      const limit = dto.limit || 10;
      const skip = (page - 1) * limit;

      const where: any = {};

      if (dto.subjectId) {
        where.subjectId = dto.subjectId;
      }

      if (dto.search) {
        where.name = { contains: dto.search };
      }

      const total = await this.prisma.lesson.count({ where });

      const lessons = await this.prisma.lesson.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          subjectId: true,
          name: true,
          description: true,
          tags: true,
          questionCount: true,
          totalTime: true,
          isActive: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const totalPages = Math.ceil(total / limit);

      return {
        message: {
          title: 'Success',
          subTitle: 'Lessons retrieved successfully',
        },
        data: {
          lessons,
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
          title: 'Failed to retrieve lessons',
          subTitle: 'An error occurred while fetching lessons',
        },
      });
    }
  }

  async updateLesson(
    id: string,
    dto: UpdateLessonDto,
  ): Promise<UpdateLessonResponse> {
    try {
      const existingLesson = await this.prisma.lesson.findUnique({
        where: { id },
      });

      if (!existingLesson) {
        throw new BadRequestException({
          message: {
            title: 'Not Found',
            subTitle: 'Lesson not found',
          },
        });
      }

      const updateData: any = {};
      if (dto.name !== undefined) updateData.name = dto.name;
      if (dto.description !== undefined) updateData.description = dto.description;
      if (dto.tags !== undefined) updateData.tags = dto.tags;
      if (dto.totalTime !== undefined) updateData.totalTime = dto.totalTime;
      if (dto.isActive !== undefined) updateData.isActive = dto.isActive;

      const lesson = await this.prisma.lesson.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          name: true,
          description: true,
          tags: true,
          questionCount: true,
          totalTime: true,
          isActive: true,
          updatedAt: true,
        },
      });

      return {
        message: {
          title: 'Success',
          subTitle: 'Lesson updated successfully',
        },
        data: lesson,
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Failed to update lesson',
          subTitle: 'An error occurred while updating the lesson',
        },
      });
    }
  }

  async deleteLesson(id: string): Promise<DeleteLessonResponse> {
    try {
      const existingLesson = await this.prisma.lesson.findUnique({
        where: { id },
        select: { subjectId: true },
      });

      if (!existingLesson) {
        throw new BadRequestException({
          message: {
            title: 'Not Found',
            subTitle: 'Lesson not found',
          },
        });
      }

      await this.prisma.lesson.delete({
        where: { id },
      });

      // Decrement subject's lessonCount
      await this.prisma.subject.update({
        where: { id: existingLesson.subjectId },
        data: {
          lessonCount: {
            decrement: 1,
          },
        },
      });

      return {
        message: {
          title: 'Success',
          subTitle: 'Lesson deleted successfully',
        },
        data: { id },
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Failed to delete lesson',
          subTitle: 'An error occurred while deleting the lesson',
        },
      });
    }
  }

  // Question CRUD operations
  async createQuestion(
    dto: CreateQuestionDto,
  ): Promise<CreateQuestionResponse> {
    try {
      // Verify lesson exists
      const lesson = await this.prisma.lesson.findUnique({
        where: { id: dto.lessonId },
      });

      if (!lesson) {
        throw new BadRequestException({
          message: {
            title: 'Not Found',
            subTitle: 'Lesson not found',
          },
        });
      }

      const question = await this.prisma.question.create({
        data: {
          lessonId: dto.lessonId,
          type: dto.type,
          statement: dto.statement,
          tag: dto.tag,
          language: dto.language ?? 'en',
          metadata: dto.metadata || {},
          marks: dto.marks ?? 1,
          expectedTime: dto.expectedTime,
        },
        select: {
          id: true,
          lessonId: true,
          type: true,
          statement: true,
          tag: true,
          language: true,
          metadata: true,
          marks: true,
          expectedTime: true,
          isActive: true,
          isDeleted: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      // Update lesson's questionCount
      await this.prisma.lesson.update({
        where: { id: dto.lessonId },
        data: {
          questionCount: {
            increment: 1,
          },
        },
      });

      return {
        message: {
          title: 'Success',
          subTitle: 'Question created successfully',
        },
        data: {
          ...question,
          metadata: question.metadata as Record<string, any> | null,
        },
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Question Creation Failed',
          subTitle: 'Failed to create question',
        },
      });
    }
  }

  async getQuestion(id: string): Promise<GetQuestionResponse> {
    try {
      const question = await this.prisma.question.findUnique({
        where: { id },
        select: {
          id: true,
          lessonId: true,
          type: true,
          statement: true,
          tag: true,
          language: true,
          metadata: true,
          marks: true,
          expectedTime: true,
          isActive: true,
          isDeleted: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!question) {
        throw new BadRequestException({
          message: {
            title: 'Not Found',
            subTitle: 'Question not found',
          },
        });
      }

      return {
        message: {
          title: 'Success',
          subTitle: 'Question retrieved successfully',
        },
        data: {
          ...question,
          metadata: question.metadata as Record<string, any> | null,
        },
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Failed to retrieve question',
          subTitle: 'An error occurred while fetching the question',
        },
      });
    }
  }

  async getQuestions(
    dto: GetQuestionsDto,
    userId: string,
  ): Promise<GetQuestionsResponse> {
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

      const where: any = {
        isDeleted: false, // Only get non-deleted questions
        language: userLanguage, // Filter by user's language
      };

      if (dto.lessonId) {
        where.lessonId = dto.lessonId;
      }

      if (dto.type) {
        where.type = dto.type;
      }

      if (dto.search) {
        where.statement = { contains: dto.search };
      }

      const total = await this.prisma.question.count({ where });

      const questions = await this.prisma.question.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          lessonId: true,
          type: true,
          statement: true,
          tag: true,
          language: true,
          marks: true,
          expectedTime: true,
          isActive: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const totalPages = Math.ceil(total / limit);

      return {
        message: {
          title: 'Success',
          subTitle: 'Questions retrieved successfully',
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
          title: 'Failed to retrieve questions',
          subTitle: 'An error occurred while fetching questions',
        },
      });
    }
  }

  async updateQuestion(
    id: string,
    dto: UpdateQuestionDto,
  ): Promise<UpdateQuestionResponse> {
    try {
      const existingQuestion = await this.prisma.question.findUnique({
        where: { id },
        select: { lessonId: true, isDeleted: true },
      });

      if (!existingQuestion) {
        throw new BadRequestException({
          message: {
            title: 'Not Found',
            subTitle: 'Question not found',
          },
        });
      }

      const updateData: any = {};
      if (dto.type !== undefined) updateData.type = dto.type;
      if (dto.statement !== undefined) updateData.statement = dto.statement;
      if (dto.tag !== undefined) updateData.tag = dto.tag;
      if (dto.language !== undefined) updateData.language = dto.language;
      if (dto.metadata !== undefined) updateData.metadata = dto.metadata;
      if (dto.marks !== undefined) updateData.marks = dto.marks;
      if (dto.expectedTime !== undefined) updateData.expectedTime = dto.expectedTime;
      if (dto.isActive !== undefined) updateData.isActive = dto.isActive;

      const question = await this.prisma.question.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          type: true,
          statement: true,
          tag: true,
          language: true,
          metadata: true,
          marks: true,
          expectedTime: true,
          isActive: true,
          updatedAt: true,
        },
      });

      // Note: We don't handle isDeleted in updateQuestion DTO, but if we add it later,
      // we would need to update lesson.questionCount here

      return {
        message: {
          title: 'Success',
          subTitle: 'Question updated successfully',
        },
        data: {
          ...question,
          metadata: question.metadata as Record<string, any> | null,
        },
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Failed to update question',
          subTitle: 'An error occurred while updating the question',
        },
      });
    }
  }

  async deleteQuestion(id: string): Promise<DeleteQuestionResponse> {
    try {
      const existingQuestion = await this.prisma.question.findUnique({
        where: { id },
        select: { lessonId: true, isDeleted: true },
      });

      if (!existingQuestion) {
        throw new BadRequestException({
          message: {
            title: 'Not Found',
            subTitle: 'Question not found',
          },
        });
      }

      await this.prisma.question.delete({
        where: { id },
      });

      // Decrement lesson's questionCount only if question was not already deleted
      if (!existingQuestion.isDeleted) {
        await this.prisma.lesson.update({
          where: { id: existingQuestion.lessonId },
          data: {
            questionCount: {
              decrement: 1,
            },
          },
        });
      }

      return {
        message: {
          title: 'Success',
          subTitle: 'Question deleted successfully',
        },
        data: { id },
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Failed to delete question',
          subTitle: 'An error occurred while deleting the question',
        },
      });
    }
  }

  // Notification CRUD operations
  async createNotification(
    dto: CreateNotificationDto,
  ): Promise<CreateNotificationResponse> {
    try {
      // Verify exam exists
      const exam = await this.prisma.exam.findUnique({
        where: { id: dto.examId },
      });

      if (!exam) {
        throw new BadRequestException({
          message: {
            title: 'Not Found',
            subTitle: 'Exam not found',
          },
        });
      }

      const notification = await this.prisma.notification.create({
        data: {
          examId: dto.examId,
          heading: dto.heading,
          description: dto.description,
          url: dto.url,
          tags: dto.tags || [],
          status: dto.status || 'draft',
        },
        select: {
          id: true,
          examId: true,
          heading: true,
          description: true,
          url: true,
          tags: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return {
        message: {
          title: 'Success',
          subTitle: 'Notification created successfully',
        },
        data: notification,
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Notification Creation Failed',
          subTitle: 'Failed to create notification',
        },
      });
    }
  }

  async getNotification(id: string): Promise<GetNotificationResponse> {
    try {
      const notification = await this.prisma.notification.findUnique({
        where: { id },
        select: {
          id: true,
          examId: true,
          heading: true,
          description: true,
          url: true,
          tags: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!notification) {
        throw new BadRequestException({
          message: {
            title: 'Not Found',
            subTitle: 'Notification not found',
          },
        });
      }

      return {
        message: {
          title: 'Success',
          subTitle: 'Notification retrieved successfully',
        },
        data: notification,
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Failed to retrieve notification',
          subTitle: 'An error occurred while fetching the notification',
        },
      });
    }
  }

  async getNotifications(
    dto: GetNotificationsDto,
  ): Promise<GetNotificationsResponse> {
    try {
      const page = dto.page || 1;
      const limit = dto.limit || 10;
      const skip = (page - 1) * limit;

      const where: any = {};

      if (dto.examId) {
        where.examId = dto.examId;
      }

      if (dto.status) {
        where.status = dto.status;
      }

      if (dto.search) {
        where.OR = [
          { heading: { contains: dto.search } },
          { description: { contains: dto.search } },
        ];
      }

      const total = await this.prisma.notification.count({ where });

      const notifications = await this.prisma.notification.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          examId: true,
          heading: true,
          description: true,
          url: true,
          tags: true,
          status: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const totalPages = Math.ceil(total / limit);

      return {
        message: {
          title: 'Success',
          subTitle: 'Notifications retrieved successfully',
        },
        data: {
          notifications,
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
          title: 'Failed to retrieve notifications',
          subTitle: 'An error occurred while fetching notifications',
        },
      });
    }
  }

  async updateNotification(
    id: string,
    dto: UpdateNotificationDto,
  ): Promise<UpdateNotificationResponse> {
    try {
      const existingNotification = await this.prisma.notification.findUnique({
        where: { id },
      });

      if (!existingNotification) {
        throw new BadRequestException({
          message: {
            title: 'Not Found',
            subTitle: 'Notification not found',
          },
        });
      }

      const updateData: any = {};
      if (dto.heading !== undefined) updateData.heading = dto.heading;
      if (dto.description !== undefined) updateData.description = dto.description;
      if (dto.url !== undefined) updateData.url = dto.url;
      if (dto.tags !== undefined) updateData.tags = dto.tags;
      if (dto.status !== undefined) updateData.status = dto.status;

      const notification = await this.prisma.notification.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          heading: true,
          description: true,
          url: true,
          tags: true,
          status: true,
          updatedAt: true,
        },
      });

      return {
        message: {
          title: 'Success',
          subTitle: 'Notification updated successfully',
        },
        data: notification,
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Failed to update notification',
          subTitle: 'An error occurred while updating the notification',
        },
      });
    }
  }

  async deleteNotification(id: string): Promise<DeleteNotificationResponse> {
    try {
      const existingNotification = await this.prisma.notification.findUnique({
        where: { id },
      });

      if (!existingNotification) {
        throw new BadRequestException({
          message: {
            title: 'Not Found',
            subTitle: 'Notification not found',
          },
        });
      }

      await this.prisma.notification.delete({
        where: { id },
      });

      return {
        message: {
          title: 'Success',
          subTitle: 'Notification deleted successfully',
        },
        data: { id },
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Failed to delete notification',
          subTitle: 'An error occurred while deleting the notification',
        },
      });
    }
  }

  // Get exam details with subjects and notifications
  async getExamDetails(
    id: string,
    userId?: string,
  ): Promise<GetExamDetailsResponse> {
    try {
      // Get exam basic details
      const exam = await this.prisma.exam.findUnique({
        where: { id },
        select: {
          name: true,
          organization: true,
          image: true,
          likeCount: true,
        },
      });

      if (!exam) {
        throw new BadRequestException({
          message: {
            title: 'Not Found',
            subTitle: 'Exam not found',
          },
        });
      }

      // Check if user has liked this exam
      let isLiked = false;
      if (userId) {
        const likeExam = await this.prisma.likeExam.findUnique({
          where: {
            userId_examId: {
              userId,
              examId: id,
            },
          },
        });
        isLiked = !!likeExam;
      }

      // Get all subjects for this exam
      const subjects = await this.prisma.subject.findMany({
        where: { examId: id },
        select: {
          id: true,
          name: true,
          description: true,
          isPremium: true,
          lessonCount: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      // Get subjects with lesson count and total question count
      const subjectsWithCounts = await Promise.all(
        subjects.map(async (subject) => {
          // Get all lessons for this subject to sum questionCount
          const lessons = await this.prisma.lesson.findMany({
            where: { subjectId: subject.id },
            select: { questionCount: true },
          });

          // Sum questionCount from all lessons
          const totalQuestions = lessons.reduce(
            (sum, lesson) => sum + lesson.questionCount,
            0,
          );

          return {
            id: subject.id,
            name: subject.name,
            description: subject.description,
            isPremium: subject.isPremium,
            lessonCount: subject.lessonCount,
            totalQuestions,
          };
        }),
      );

      // Get all notifications for this exam
      const notifications = await this.prisma.notification.findMany({
        where: { examId: id },
        select: {
          id: true,
          heading: true,
          description: true,
          url: true,
          tags: true,
          status: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return {
        message: {
          title: 'Success',
          subTitle: 'Exam details retrieved successfully',
        },
        data: {
          name: exam.name,
          organization: exam.organization,
          image: exam.image,
          likeCount: exam.likeCount,
          isLiked,
          subjects: subjectsWithCounts,
          notifications,
        },
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Failed to retrieve exam details',
          subTitle: 'An error occurred while fetching exam details',
        },
      });
    }
  }

  async getLessonsBySubject(subjectId: string): Promise<GetLessonsBySubjectResponse> {
    try {
      // Check if subject exists
      const subject = await this.prisma.subject.findUnique({
        where: { id: subjectId },
        select: { id: true },
      });

      if (!subject) {
        throw new BadRequestException({
          message: {
            title: 'Not Found',
            subTitle: 'Subject not found',
          },
        });
      }

      // Get all lessons for this subject
      const lessons = await this.prisma.lesson.findMany({
        where: { subjectId },
        select: {
          id: true,
          name: true,
          tags: true,
          totalTime: true,
          questionCount: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      // For each lesson, count the bookmarked questions
      const lessonsWithBookmarkCount = await Promise.all(
        lessons.map(async (lesson) => {
          // Count bookmarked questions for this lesson
          const bookmarkedCount = await this.prisma.bookmarkQuestion.count({
            where: {
              question: {
                lessonId: lesson.id,
                isDeleted: false,
              },
            },
          });

          return {
            id: lesson.id,
            name: lesson.name,
            tags: lesson.tags,
            totalTime: lesson.totalTime,
            totalQuestions: lesson.questionCount,
            totalBookmarkedQuestions: bookmarkedCount,
          };
        }),
      );

      return {
        message: {
          title: 'Success',
          subTitle: 'Lessons retrieved successfully',
        },
        data: lessonsWithBookmarkCount,
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Failed to retrieve lessons',
          subTitle: 'An error occurred while fetching lessons',
        },
      });
    }
  }

  async getQuestionsByLesson(
    lessonId: string,
    userId: string,
    dto: GetQuestionsByLessonDto,
  ): Promise<GetQuestionsByLessonResponse> {
    try {
      // Check if lesson exists
      const lesson = await this.prisma.lesson.findUnique({
        where: { id: lessonId },
        select: { id: true },
      });

      if (!lesson) {
        throw new BadRequestException({
          message: {
            title: 'Not Found',
            subTitle: 'Lesson not found',
          },
        });
      }

      // Get user's language preference
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { language: true },
      });

      const userLanguage = user?.language || 'en';

      const page = dto.page || 1;
      const limit = dto.limit || 10;
      const skip = (page - 1) * limit;

      // Build where clause
      const where: any = {
        lessonId,
        isDeleted: false, // Only get non-deleted questions
        language: userLanguage, // Filter by user's language
      };

      // Filter by tags if provided
      if (dto.tags && dto.tags.length > 0) {
        where.tag = { in: dto.tags };
      }

      // If bookmarked is true, filter to only bookmarked questions
      // If bookmarked is false or undefined, return all questions (no bookmark filtering)
      if (dto.bookmarked === true) {
        // Build question filter for bookmarked questions query
        const questionFilter: any = {
          lessonId,
          isDeleted: false,
          language: userLanguage, // Filter by user's language
        };

        // Apply tag filter to bookmarked questions query if provided
        if (dto.tags && dto.tags.length > 0) {
          questionFilter.tag = { in: dto.tags };
        }

        // Get all bookmarked question IDs for this user in this lesson
        const bookmarkedQuestions = await this.prisma.bookmarkQuestion.findMany({
          where: {
            userId,
            question: questionFilter,
          },
          select: {
            questionId: true,
          },
        });

        const bookmarkedQuestionIds = bookmarkedQuestions.map(
          (bq) => bq.questionId,
        );

        if (bookmarkedQuestionIds.length === 0) {
          // No bookmarked questions, return empty result
          return {
            message: {
              title: 'Success',
              subTitle: 'Questions retrieved successfully',
            },
            data: {
              questions: [],
              meta: {
                page,
                limit,
                total: 0,
                totalPages: 0,
              },
            },
          };
        }

        where.id = { in: bookmarkedQuestionIds };
      }

      // Get total count
      const total = await this.prisma.question.count({ where });

      // Get paginated questions
      const questions = await this.prisma.question.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          lessonId: true,
          type: true,
          statement: true,
          tag: true,
          language: true,
          metadata: true,
          marks: true,
          expectedTime: true,
          isActive: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      // Get all bookmarked question IDs for this user in this lesson
      const bookmarkedQuestions = await this.prisma.bookmarkQuestion.findMany({
        where: {
          userId,
          questionId: {
            in: questions.map((q) => q.id),
          },
        },
        select: {
          questionId: true,
        },
      });

      const bookmarkedQuestionIdsSet = new Set(
        bookmarkedQuestions.map((bq) => bq.questionId),
      );

      // Add isBookmarked flag to each question
      const questionsWithBookmarkStatus = questions.map((question) => ({
        ...question,
        metadata: question.metadata as Record<string, any> | null,
        isBookmarked: bookmarkedQuestionIdsSet.has(question.id),
      }));

      const totalPages = Math.ceil(total / limit);

      return {
        message: {
          title: 'Success',
          subTitle: 'Questions retrieved successfully',
        },
        data: {
          questions: questionsWithBookmarkStatus,
          meta: {
            page,
            limit,
            total,
            totalPages,
          },
        },
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException({
        message: {
          title: 'Failed to retrieve questions',
          subTitle: 'An error occurred while fetching questions',
        },
      });
    }
  }

  async toggleLikeExam(examId: string, userId: string): Promise<LikeExamResponse> {
    try {
      // Check if exam exists
      const exam = await this.prisma.exam.findUnique({
        where: { id: examId },
        select: { id: true, likeCount: true },
      });

      if (!exam) {
        throw new BadRequestException({
          message: {
            title: 'Exam not found',
            subTitle: 'The exam you are trying to like does not exist',
          },
        });
      }

      // Check if user has already liked this exam
      const existingLike = await this.prisma.likeExam.findUnique({
        where: {
          userId_examId: {
            userId,
            examId,
          },
        },
      });

      let isLiked: boolean;
      let newLikeCount: number;

      if (existingLike) {
        // Unlike: Remove the like and decrement count
        await this.prisma.likeExam.delete({
          where: {
            id: existingLike.id,
          },
        });

        // Decrement likeCount atomically
        const updatedExam = await this.prisma.exam.update({
          where: { id: examId },
          data: {
            likeCount: {
              decrement: 1,
            },
          },
          select: { likeCount: true },
        });

        isLiked = false;
        newLikeCount = updatedExam.likeCount;
      } else {
        // Like: Create the like and increment count
        await this.prisma.likeExam.create({
          data: {
            userId,
            examId,
          },
        });

        // Increment likeCount atomically
        const updatedExam = await this.prisma.exam.update({
          where: { id: examId },
          data: {
            likeCount: {
              increment: 1,
            },
          },
          select: { likeCount: true },
        });

        isLiked = true;
        newLikeCount = updatedExam.likeCount;
      }

      return {
        message: {
          title: 'Success',
          subTitle: isLiked
            ? 'Exam liked successfully'
            : 'Exam unliked successfully',
        },
        data: {
          examId,
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

  async toggleBookmarkQuestion(
    questionId: string,
    userId: string,
  ): Promise<BookmarkQuestionResponse> {
    try {
      // Check if question exists
      const question = await this.prisma.question.findUnique({
        where: { id: questionId },
        select: { id: true },
      });

      if (!question) {
        throw new BadRequestException({
          message: {
            title: 'Question not found',
            subTitle: 'The question you are trying to bookmark does not exist',
          },
        });
      }

      // Check if user has already bookmarked this question
      const existingBookmark = await this.prisma.bookmarkQuestion.findUnique({
        where: {
          userId_questionId: {
            userId,
            questionId,
          },
        },
      });

      let isBookmarked: boolean;

      if (existingBookmark) {
        // Unbookmark: Remove the bookmark
        await this.prisma.bookmarkQuestion.delete({
          where: {
            id: existingBookmark.id,
          },
        });

        isBookmarked = false;
      } else {
        // Bookmark: Create the bookmark
        await this.prisma.bookmarkQuestion.create({
          data: {
            userId,
            questionId,
          },
        });

        isBookmarked = true;
      }

      return {
        message: {
          title: 'Success',
          subTitle: isBookmarked
            ? 'Question bookmarked successfully'
            : 'Question unbookmarked successfully',
        },
        data: {
          questionId,
          isBookmarked,
        },
      };
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
}

