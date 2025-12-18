import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}
  async getUserDetails(userId: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          language: true,
          isPremium: true,
          isFirstLogin: true,
          examId: true,
        },
      });

      if (!user) {
        throw new NotFoundException({
          message: {
            title: 'User Not Found',
            subTitle: 'The requested user could not be found',
          },
        });
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        language: user.language,
        isPremium: user.isPremium,
        isFirstLogin: user.isFirstLogin,
        examId: user.examId,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException({
        message: {
          title: 'Error',
          subTitle: 'Failed to retrieve user details',
        },
      });
    }
  }

  async setExamId(userId: string, examId: string) {
    try {
      // Verify that the exam exists
      const exam = await this.prisma.exam.findUnique({
        where: { id: examId },
      });

      if (!exam) {
        throw new NotFoundException({
          message: {
            title: 'Exam Not Found',
            subTitle: 'The specified exam does not exist',
          },
        });
      }

      // Update user's examId and set isFirstLogin to false
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: { 
          examId,
          isFirstLogin: false,
        },
        select: {
          id: true,
          examId: true,
        },
      });

      return {
        message: {
          title: 'Success',
          subTitle: 'Exam ID updated successfully',
        },
        data: {
          id: user.id,
          examId: user.examId,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException({
        message: {
          title: 'Error',
          subTitle: 'Failed to update exam ID',
        },
      });
    }
  }
}
