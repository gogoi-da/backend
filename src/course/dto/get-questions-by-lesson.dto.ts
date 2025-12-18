import { IsOptional, IsInt, Min, IsBoolean, IsArray, IsString } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetQuestionsByLessonDto {
  @ApiProperty({
    description: 'Page number for pagination',
    example: 1,
    default: 1,
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
    default: 10,
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number = 10;

  @ApiProperty({
    description: 'Bookmark filter. If true, returns only bookmarked questions. If false or undefined, returns all questions.',
    example: false,
    required: false,
  })
  @Transform(({ value }) => {
    if (value === undefined || value === null) return false;
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      const lowerValue = value.toLowerCase().trim();
      return lowerValue === 'true' || lowerValue === '1';
    }
    return false;
  })
  @IsBoolean()
  @IsOptional()
  bookmarked?: boolean = false;

  @ApiProperty({
    description: 'Filter questions by tags. Returns questions that match any of the provided tags. Can be comma-separated string or array.',
    example: ['arithmetic', 'algebra'],
    type: [String],
    required: false,
  })
  @Transform(({ value }) => {
    if (!value) return undefined;
    // If it's already an array, return it
    if (Array.isArray(value)) return value;
    // If it's a string, split by comma and trim whitespace
    if (typeof value === 'string') {
      return value.split(',').map((tag) => tag.trim()).filter(Boolean);
    }
    return value;
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}

