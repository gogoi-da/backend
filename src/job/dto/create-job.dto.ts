import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsUrl,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateOpeningDto } from './create-opening.dto';
import { CreateImportantDateDto } from './create-important-date.dto';
import { CreateImportantLinkDto } from './create-important-link.dto';

export class CreateJobDto {
  @ApiProperty({
    description: 'Job heading/title',
    example: 'Maharashtra Police Recruitment 2024',
  })
  @IsString()
  @IsNotEmpty()
  heading: string;

  @ApiProperty({
    description: 'Company/Organization name',
    example: 'Maharashtra Police Department',
  })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({
    description: 'Company logo URL',
    example: 'https://example.com/logo.png',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  companyLogoUrl?: string;

  @ApiProperty({
    description: 'Company details/information',
    example: 'Government organization responsible for law enforcement',
    required: false,
  })
  @IsString()
  @IsOptional()
  companyDetails?: string;

  @ApiProperty({
    description: 'Last date to apply for the job',
    example: '2024-12-31T23:59:59.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  lastDateToApply: string;

  @ApiProperty({
    description: 'YouTube video URL related to the job',
    example: 'https://www.youtube.com/watch?v=example',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  youtubeVideoUrl?: string;

  @ApiProperty({
    description: 'Tags for filtering jobs',
    example: ['SI', 'CONSTABLE', 'GRADE3&4'],
    required: false,
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    description: 'Array of job openings',
    type: [CreateOpeningDto],
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOpeningDto)
  @IsOptional()
  openings?: CreateOpeningDto[];

  @ApiProperty({
    description: 'Array of important dates',
    type: [CreateImportantDateDto],
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateImportantDateDto)
  @IsOptional()
  importantDates?: CreateImportantDateDto[];

  @ApiProperty({
    description: 'Array of important links',
    type: [CreateImportantLinkDto],
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateImportantLinkDto)
  @IsOptional()
  importantLinks?: CreateImportantLinkDto[];
}

