import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class QuestionDetailData {
  @ApiProperty({ description: 'Question ID', example: '507f1f77bcf86cd799439011' })
  id: string;

  @ApiProperty({ description: 'Lesson ID', example: '507f1f77bcf86cd799439011' })
  lessonId: string;

  @ApiProperty({ description: 'Question type', example: 'mcq' })
  type: string;

  @ApiProperty({ description: 'Question statement', example: 'What is 2 + 2?' })
  statement: string;

  @ApiProperty({
    description: 'Tag for the question',
    example: 'arithmetic',
    nullable: true,
    required: false,
  })
  tag: string | null;

  @ApiProperty({ description: 'Language of the question', example: 'en' })
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
    nullable: true,
    required: false,
  })
  metadata: Record<string, any> | null;

  @ApiProperty({ description: 'Marks allocated', example: 1 })
  marks: number;

  @ApiProperty({
    description: 'Expected time in seconds',
    example: 60,
    nullable: true,
    required: false,
  })
  expectedTime: number | null;

  @ApiProperty({ description: 'Is active', example: true })
  isActive: boolean;

  @ApiProperty({ description: 'Is deleted', example: false })
  isDeleted: boolean;

  @ApiProperty({ description: 'Created at timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated at timestamp' })
  updatedAt: Date;
}

export class GetQuestionResponse extends MessageResponse {
  @ApiProperty({ description: 'Question details', type: QuestionDetailData })
  data: QuestionDetailData;
}

