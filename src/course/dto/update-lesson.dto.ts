import { IsString, IsOptional, IsBoolean, IsArray, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLessonDto {
  @ApiProperty({
    description: 'Lesson name',
    example: 'Algebra Basics',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Lesson description',
    example: 'Introduction to algebraic expressions and equations',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Tags for the lesson',
    example: ['algebra', 'basics', 'math'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    description: 'Total time for the lesson in seconds',
    example: 3600,
    required: false,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  totalTime?: number;

  @ApiProperty({
    description: 'Whether the lesson is active',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

