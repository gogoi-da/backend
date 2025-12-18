import {
  IsString,
  IsOptional,
  IsUrl,
  IsNumber,
  Min,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateExamDto {
  @ApiProperty({
    description: 'Exam name',
    example: 'SI',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Organization conducting the exam',
    example: 'Maharashtra Police Department',
    required: false,
  })
  @IsString()
  @IsOptional()
  organization?: string;

  @ApiProperty({
    description: 'Exam image URL',
    example: 'https://example.com/exam-image.png',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'Exam description',
    example: 'Sub-Inspector recruitment exam',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Exam price',
    example: 999.99,
    required: false,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Total number of questions',
    example: 100,
    required: false,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  totalQuestion?: number;

  @ApiProperty({
    description: 'Total number of mock tests',
    example: 10,
    required: false,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  totalMockTests?: number;

  @ApiProperty({
    description: 'Exam rating',
    example: 4.5,
    required: false,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  rating?: number;

  @ApiProperty({
    description: 'Whether the exam is active',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

