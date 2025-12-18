import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class ExamListItem {
  @ApiProperty({
    description: 'Exam ID',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({
    description: 'Exam name',
    example: 'SI',
  })
  name: string;

  @ApiProperty({
    description: 'Organization',
    example: 'Maharashtra Police Department',
  })
  organization: string;

  @ApiProperty({
    description: 'Exam image URL',
    example: 'https://example.com/exam-image.png',
    nullable: true,
  })
  image: string | null;

  @ApiProperty({
    description: 'Exam description',
    example: 'Sub-Inspector recruitment exam',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    description: 'Exam price',
    example: 999.99,
  })
  price: number;

  @ApiProperty({
    description: 'Total number of questions',
    example: 100,
  })
  totalQuestion: number;

  @ApiProperty({
    description: 'Total number of mock tests',
    example: 10,
  })
  totalMockTests: number;

  @ApiProperty({
    description: 'Exam rating',
    example: 4.5,
  })
  rating: number;

  @ApiProperty({
    description: 'Like count',
    example: 50,
  })
  likeCount: number;

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
    description: 'Total number of exams',
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 10,
  })
  totalPages: number;
}

class GetExamsData {
  @ApiProperty({
    description: 'List of exams',
    type: [ExamListItem],
  })
  exams: ExamListItem[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMeta,
  })
  meta: PaginationMeta;
}

export class GetExamsResponse extends MessageResponse {
  @ApiProperty({
    description: 'Exams data with pagination',
    type: GetExamsData,
  })
  data: GetExamsData;
}

