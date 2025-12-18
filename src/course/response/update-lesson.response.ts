import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class UpdateLessonData {
  @ApiProperty({
    description: 'Lesson ID',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({
    description: 'Lesson name',
    example: 'Algebra Basics',
  })
  name: string;

  @ApiProperty({
    description: 'Lesson description',
    example: 'Introduction to algebraic expressions and equations',
    required: false,
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
    required: false,
    nullable: true,
  })
  totalTime: number | null;

  @ApiProperty({
    description: 'Is active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Updated at timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}

export class UpdateLessonResponse extends MessageResponse {
  @ApiProperty({
    description: 'Updated lesson data',
    type: UpdateLessonData,
  })
  data: UpdateLessonData;
}

