import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  Min,
  IsIn,
  IsObject,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty({
    description: 'Lesson ID',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  lessonId: string;

  @ApiProperty({
    description: 'Question type',
    example: 'mcq',
    enum: ['mcq', 'multiple_select', 'coding', 'subjective', 'true_false', 'fill_blank'],
  })
  @IsString()
  @IsIn(['mcq', 'multiple_select', 'coding', 'subjective', 'true_false', 'fill_blank'])
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: 'Question statement/text',
    example: 'What is 2 + 2?',
  })
  @IsString()
  @IsNotEmpty()
  statement: string;

  @ApiProperty({
    description: 'Tag for the question',
    example: 'arithmetic',
    required: false,
  })
  @IsString()
  @IsOptional()
  tag?: string;

  @ApiProperty({
    description: 'Question metadata (JSON object)',
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
  })
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;

  @ApiProperty({
    description: 'Marks allocated for this question',
    example: 1,
    default: 1,
    required: false,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  marks?: number;

  @ApiProperty({
    description: 'Expected time to answer in seconds',
    example: 60,
    required: false,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  expectedTime?: number;
}

