import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class LessonListItem {
  @ApiProperty({
    description: 'Lesson ID',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({
    description: 'Subject ID',
    example: '507f1f77bcf86cd799439011',
  })
  subjectId: string;

  @ApiProperty({
    description: 'Lesson name',
    example: 'Algebra Basics',
  })
  name: string;

  @ApiProperty({
    description: 'Lesson description',
    example: 'Introduction to algebraic expressions and equations',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    description: 'Tags for the lesson',
    example: ['algebra', 'basics', 'math'],
    type: [String],
  })
  tags: string[];

  @ApiProperty({
    description: 'Number of questions in this lesson',
    example: 25,
  })
  questionCount: number;

  @ApiProperty({
    description: 'Total time for the lesson in seconds',
    example: 3600,
    nullable: true,
  })
  totalTime: number | null;

  @ApiProperty({
    description: 'Is active',
    example: true,
  })
  isActive: boolean;
}

class PaginationMeta {
  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  limit: number;

  @ApiProperty({
    description: 'Total number of lessons',
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 10,
  })
  totalPages: number;
}

class GetLessonsData {
  @ApiProperty({
    description: 'List of lessons',
    type: [LessonListItem],
  })
  lessons: LessonListItem[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMeta,
  })
  meta: PaginationMeta;
}

export class GetLessonsResponse extends MessageResponse {
  @ApiProperty({
    description: 'Lessons data with pagination',
    type: GetLessonsData,
  })
  data: GetLessonsData;
}

