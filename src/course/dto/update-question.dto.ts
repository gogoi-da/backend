import {
  IsString,
  IsOptional,
  IsInt,
  Min,
  IsIn,
  IsObject,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuestionDto {
  @ApiProperty({
    description: 'Question type',
    example: 'mcq',
    enum: ['mcq', 'multiple_select', 'coding', 'subjective', 'true_false', 'fill_blank'],
    required: false,
  })
  @IsString()
  @IsIn(['mcq', 'multiple_select', 'coding', 'subjective', 'true_false', 'fill_blank'])
  @IsOptional()
  type?: string;

  @ApiProperty({
    description: 'Question statement/text',
    example: 'What is 2 + 2?',
    required: false,
  })
  @IsString()
  @IsOptional()
  statement?: string;

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

  @ApiProperty({
    description: 'Whether the question is active',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

