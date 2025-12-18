import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class ExamData {
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
    required: false,
    nullable: true,
  })
  image: string | null;

  @ApiProperty({
    description: 'Exam description',
    example: 'Sub-Inspector recruitment exam',
    required: false,
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

  @ApiProperty({
    description: 'Created at timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Updated at timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}

export class CreateExamResponse extends MessageResponse {
  @ApiProperty({
    description: 'Created exam data',
    type: ExamData,
  })
  data: ExamData;
}

