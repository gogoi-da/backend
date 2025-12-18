import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTestSeriesDto {
  @ApiProperty({
    description: 'Exam ID that this test series belongs to',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  examId: string;

  @ApiProperty({
    description: 'Name of the test series',
    example: 'UPSC Prelims Mock Test Series 2024',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Organization that owns this test series',
    example: 'UPSC Training Institute',
  })
  @IsString()
  @IsNotEmpty()
  organization: string;

  @ApiProperty({
    description: 'Description of the test series',
    example: 'Comprehensive mock test series for UPSC Prelims preparation',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Image URL for the test series',
    example: 'https://example.com/test-series-image.png',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'Whether the test series is premium',
    example: false,
    default: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isPremium?: boolean;

  @ApiProperty({
    description: 'Whether the test series is active',
    example: true,
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

