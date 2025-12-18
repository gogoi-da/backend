import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class TestQuestionItem {
  @ApiProperty({
    description: 'Test Question ID',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({
    description: 'Test ID',
    example: '507f1f77bcf86cd799439011',
  })
  testId: string;

  @ApiProperty({
    description: 'Optional reference to existing Question ID',
    example: '507f1f77bcf86cd799439011',
    required: false,
    nullable: true,
  })
  questionId: string | null;

  @ApiProperty({
    description: 'Type of question',
    example: 'mcq',
  })
  type: string;

  @ApiProperty({
    description: 'The question text/statement',
    example: 'What is the capital of France?',
  })
  statement: string;

  @ApiProperty({
    description: 'Tag for the question',
    example: 'Geography',
    required: false,
    nullable: true,
  })
  tag: string | null;

  @ApiProperty({
    description: 'Question-specific metadata (JSON object)',
    example: {
      options: [{ id: '1', text: 'Paris' }, { id: '2', text: 'London' }],
      correctOption: ['1'],
    },
    required: false,
    nullable: true,
  })
  metadata: any;

  @ApiProperty({
    description: 'Marks allocated for this question',
    example: 1,
  })
  marks: number;

  @ApiProperty({
    description: 'Expected time to answer in seconds',
    example: 60,
    required: false,
    nullable: true,
  })
  expectedTime: number | null;

  @ApiProperty({
    description: 'Order of question in the test',
    example: 0,
  })
  order: number;

  @ApiProperty({
    description: 'Whether the question is active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Created at timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Updated at timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
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
    description: 'Total number of items',
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 10,
  })
  totalPages: number;
}

class TestQuestionsListData {
  @ApiProperty({
    description: 'List of test questions',
    type: [TestQuestionItem],
  })
  questions: TestQuestionItem[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMeta,
  })
  meta: PaginationMeta;
}

export class GetTestQuestionsListResponse extends MessageResponse {
  @ApiProperty({
    description: 'Test questions list with pagination',
    type: TestQuestionsListData,
  })
  data: TestQuestionsListData;
}

