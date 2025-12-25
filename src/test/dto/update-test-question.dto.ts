import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  Min,
  IsObject,
  IsIn,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTestQuestionDto {
  @ApiProperty({
    description: 'Test ID that this question belongs to',
    example: '507f1f77bcf86cd799439011',
    required: false,
  })
  @IsString()
  @IsOptional()
  testId?: string;

  @ApiProperty({
    description: 'Optional reference to existing Question ID',
    example: '507f1f77bcf86cd799439011',
    required: false,
  })
  @IsString()
  @IsOptional()
  questionId?: string;

  @ApiProperty({
    description: 'Type of question',
    example: 'mcq',
    enum: ['mcq', 'multiple_select', 'coding', 'subjective', 'true_false', 'fill_blank'],
    required: false,
  })
  @IsString()
  @IsIn(['mcq', 'multiple_select', 'coding', 'subjective', 'true_false', 'fill_blank'])
  @IsOptional()
  type?: string;

  @ApiProperty({
    description: 'The question text/statement',
    example: 'What is the capital of France?',
    required: false,
  })
  @IsString()
  @IsOptional()
  statement?: string;

  @ApiProperty({
    description: 'Tag for the question',
    example: 'Geography',
    required: false,
  })
  @IsString()
  @IsOptional()
  tag?: string;

  @ApiProperty({
    description: 'Language of the question',
    example: 'en',
    required: false,
  })
  @IsString()
  @IsOptional()
  language?: string;

  @ApiProperty({
    description: 'Question-specific metadata (JSON object)',
    example: {
      options: [{ id: '1', text: 'Paris' }, { id: '2', text: 'London' }],
      correctOption: ['1'],
    },
    required: false,
  })
  @IsObject()
  @IsOptional()
  metadata?: any;

  @ApiProperty({
    description: 'Marks allocated for this question',
    example: 1,
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  marks?: number;

  @ApiProperty({
    description: 'Expected time to answer in seconds',
    example: 60,
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  expectedTime?: number;

  @ApiProperty({
    description: 'Order of question in the test',
    example: 0,
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  order?: number;

  @ApiProperty({
    description: 'Whether the question is active',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

