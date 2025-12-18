import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsNumber,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExamDto {
  @ApiProperty({
    description: 'Exam name',
    example: 'SI',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Organization conducting the exam',
    example: 'Maharashtra Police Department',
  })
  @IsString()
  @IsNotEmpty()
  organization: string;

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
    default: 0,
    required: false,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Total number of questions',
    example: 100,
    default: 0,
    required: false,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  totalQuestion?: number;

  @ApiProperty({
    description: 'Total number of mock tests',
    example: 10,
    default: 0,
    required: false,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  totalMockTests?: number;

  @ApiProperty({
    description: 'Exam rating',
    example: 4.5,
    default: 0,
    required: false,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  rating?: number;
}

