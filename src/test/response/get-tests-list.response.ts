import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class TestItem {
  @ApiProperty({
    description: 'Test ID',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({
    description: 'Test Series ID',
    example: '507f1f77bcf86cd799439011',
  })
  testSeriesId: string;

  @ApiProperty({
    description: 'Name of the test',
    example: 'UPSC Prelims Mock Test 1',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the test',
    example: 'Comprehensive mock test for UPSC Prelims preparation',
    required: false,
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    description: 'Duration of the test in minutes',
    example: 120,
    required: false,
    nullable: true,
  })
  duration: number | null;

  @ApiProperty({
    description: 'Total marks for the test',
    example: 200,
  })
  totalMarks: number;

  @ApiProperty({
    description: 'Total number of questions in the test',
    example: 100,
  })
  totalQuestions: number;

  @ApiProperty({
    description: 'Passing marks threshold',
    example: 66,
    required: false,
    nullable: true,
  })
  passingMarks: number | null;

  @ApiProperty({
    description: 'Difficulty level of the test',
    example: 'medium',
    enum: ['easy', 'medium', 'hard'],
    required: false,
    nullable: true,
  })
  difficulty: string | null;

  @ApiProperty({
    description: 'Whether the test is premium',
    example: false,
  })
  isPremium: boolean;

  @ApiProperty({
    description: 'Whether the test is active',
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

class TestsListData {
  @ApiProperty({
    description: 'List of tests',
    type: [TestItem],
  })
  tests: TestItem[];
}

export class GetTestsListResponse extends MessageResponse {
  @ApiProperty({
    description: 'Tests list',
    type: TestsListData,
  })
  data: TestsListData;
}

