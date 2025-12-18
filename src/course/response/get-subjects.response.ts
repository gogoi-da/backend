import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class SubjectListItem {
  @ApiProperty({
    description: 'Subject ID',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({
    description: 'Exam ID',
    example: '507f1f77bcf86cd799439011',
  })
  examId: string;

  @ApiProperty({
    description: 'Subject name',
    example: 'Mathematics',
  })
  name: string;

  @ApiProperty({
    description: 'Subject description',
    example: 'Mathematics subject covering algebra, geometry, and calculus',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    description: 'Is premium',
    example: false,
  })
  isPremium: boolean;

  @ApiProperty({
    description: 'Is active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Number of lessons in this subject',
    example: 10,
  })
  lessonCount: number;
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
    description: 'Total number of subjects',
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 10,
  })
  totalPages: number;
}

class GetSubjectsData {
  @ApiProperty({
    description: 'List of subjects',
    type: [SubjectListItem],
  })
  subjects: SubjectListItem[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMeta,
  })
  meta: PaginationMeta;
}

export class GetSubjectsResponse extends MessageResponse {
  @ApiProperty({
    description: 'Subjects data with pagination',
    type: GetSubjectsData,
  })
  data: GetSubjectsData;
}

