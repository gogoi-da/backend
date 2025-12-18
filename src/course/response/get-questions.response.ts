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

class GetQuestionsData {
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

export class GetQuestionsResponse extends MessageResponse {
  @ApiProperty({
    description: 'Questions data with pagination',
    type: GetQuestionsData,
  })
  data: GetQuestionsData;
}

