import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class LessonDetailData {
  @ApiProperty({ description: 'Lesson ID', example: '507f1f77bcf86cd799439011' })
  id: string;

  @ApiProperty({ description: 'Subject ID', example: '507f1f77bcf86cd799439011' })
  subjectId: string;

  @ApiProperty({ description: 'Lesson name', example: 'Algebra Basics' })
  name: string;

  @ApiProperty({
    description: 'Lesson description',
    example: 'Introduction to algebraic expressions and equations',
    nullable: true,
    required: false,
  })
  description: string | null;

  @ApiProperty({
    description: 'Tags for the lesson',
    example: ['algebra', 'basics', 'math'],
    type: [String],
  })
  tags: string[];

  @ApiProperty({ description: 'Number of questions in this lesson', example: 25 })
  questionCount: number;

  @ApiProperty({
    description: 'Total time for the lesson in seconds',
    example: 3600,
    nullable: true,
    required: false,
  })
  totalTime: number | null;

  @ApiProperty({ description: 'Is active', example: true })
  isActive: boolean;

  @ApiProperty({ description: 'Created at timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated at timestamp' })
  updatedAt: Date;
}

export class GetLessonResponse extends MessageResponse {
  @ApiProperty({ description: 'Lesson details', type: LessonDetailData })
  data: LessonDetailData;
}

