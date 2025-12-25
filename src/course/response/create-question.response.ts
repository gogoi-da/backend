import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class QuestionData {
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
    required: false,
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
        { id: 3, text: 'Precision-Recall Curve' },
        { id: 4, text: 'Both 2 and 3' },
      ],
      correctOption: [2, 4],
    },
    required: false,
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
    required: false,
    nullable: true,
  })
  expectedTime: number | null;

  @ApiProperty({
    description: 'Is active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Is deleted',
    example: false,
  })
  isDeleted: boolean;

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

export class CreateQuestionResponse extends MessageResponse {
  @ApiProperty({
    description: 'Created question data',
    type: QuestionData,
  })
  data: QuestionData;
}

