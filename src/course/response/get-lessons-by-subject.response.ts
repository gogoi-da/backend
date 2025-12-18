import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class LessonListItem {
  @ApiProperty({
    description: 'Lesson ID',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({
    description: 'Lesson name',
    example: 'Introduction to Algebra',
  })
  name: string;

  @ApiProperty({
    description: 'Tags for the lesson',
    example: ['algebra', 'basics', 'math'],
    type: [String],
  })
  tags: string[];

  @ApiProperty({
    description: 'Total time for the lesson in seconds',
    example: 3600,
    nullable: true,
  })
  totalTime: number | null;

  @ApiProperty({
    description: 'Total number of questions in this lesson',
    example: 25,
  })
  totalQuestions: number;

  @ApiProperty({
    description: 'Total number of bookmarked questions in this lesson',
    example: 5,
  })
  totalBookmarkedQuestions: number;
}

export class GetLessonsBySubjectResponse extends MessageResponse {
  @ApiProperty({
    description: 'List of lessons with bookmark counts',
    type: [LessonListItem],
  })
  data: LessonListItem[];
}

