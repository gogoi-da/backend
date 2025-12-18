import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class BookmarkQuestionData {
  @ApiProperty({
    description: 'Question ID',
    example: '507f1f77bcf86cd799439011',
  })
  questionId: string;

  @ApiProperty({
    description: 'Whether the question is bookmarked by the user',
    example: true,
  })
  isBookmarked: boolean;
}

export class BookmarkQuestionResponse extends MessageResponse {
  @ApiProperty({
    description: 'Bookmark question data',
    type: BookmarkQuestionData,
  })
  data: BookmarkQuestionData;
}

