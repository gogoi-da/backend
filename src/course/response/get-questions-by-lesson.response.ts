import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class QuestionListItem {
  @ApiProperty({
    description: 'Question ID',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({
    description: 'Lesson ID',
    example: '507f1f77bcf86cd799439011',
  })
  lessonId: string;

  @ApiProperty({
    description: 'Question type',
    example: 'mcq',
  })
  type: string;

  @ApiProperty({
    description: 'Question statement',
    example: 'What is 2 + 2?',
  })
  statement: string;

  @ApiProperty({
    description: 'Tag for the question',
    example: 'arithmetic',
    nullable: true,
  })
  tag: string | null;

  @ApiProperty({
    description: 'Language of the question',
    example: 'en',
  })
  language: string;

  @ApiProperty({
    description: 'Question metadata',
    example: {
      options: [
        { id: 1, text: 'Mean Squared Error' },
        { id: 2, text: 'Confusion Matrix' },
      ],
      correctOption: [2],
    },
    nullable: true,
  })
  metadata: Record<string, any> | null;

  @ApiProperty({
    description: 'Marks allocated',
    example: 1,
  })
  marks: number;

  @ApiProperty({
    description: 'Expected time in seconds',
    example: 60,
    nullable: true,
  })
  expectedTime: number | null;

  @ApiProperty({
    description: 'Is active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Whether this question is bookmarked by the current user',
    example: true,
  })
  isBookmarked: boolean;

  @ApiProperty({
    description: 'Created at timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;
}

class PaginationMeta {
  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  limit: number;

  @ApiProperty({
    description: 'Total number of questions',
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 10,
  })
  totalPages: number;
}

class GetQuestionsByLessonData {
  @ApiProperty({
    description: 'List of questions',
    type: [QuestionListItem],
  })
  questions: QuestionListItem[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMeta,
  })
  meta: PaginationMeta;
}

export class GetQuestionsByLessonResponse extends MessageResponse {
  @ApiProperty({
    description: 'Questions data with pagination',
    type: GetQuestionsByLessonData,
  })
  data: GetQuestionsByLessonData;
}

