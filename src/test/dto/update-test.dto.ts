import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTestDto {
  @ApiProperty({
    description: 'Test Series ID that this test belongs to',
    example: '507f1f77bcf86cd799439011',
    required: false,
  })
  @IsString()
  @IsOptional()
  testSeriesId?: string;

  @ApiProperty({
    description: 'Name of the test',
    example: 'UPSC Prelims Mock Test 1',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Description of the test',
    example: 'Comprehensive mock test for UPSC Prelims preparation',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Duration of the test in minutes',
    example: 120,
    required: false,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  duration?: number;

  @ApiProperty({
    description: 'Total marks for the test',
    example: 200,
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  totalMarks?: number;

  @ApiProperty({
    description: 'Total number of questions in the test',
    example: 100,
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  totalQuestions?: number;

  @ApiProperty({
    description: 'Passing marks threshold',
    example: 66,
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  passingMarks?: number;

  @ApiProperty({
    description: 'Difficulty level of the test',
    example: 'medium',
    enum: ['easy', 'medium', 'hard'],
    required: false,
  })
  @IsString()
  @IsOptional()
  difficulty?: string;

  @ApiProperty({
    description: 'Whether the test is premium',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isPremium?: boolean;

  @ApiProperty({
    description: 'Whether the test is active',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

