import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class LikeExamData {
  @ApiProperty({
    description: 'Exam ID',
    example: '507f1f77bcf86cd799439011',
  })
  examId: string;

  @ApiProperty({
    description: 'Whether the exam is liked by the user',
    example: true,
  })
  isLiked: boolean;

  @ApiProperty({
    description: 'Current like count for the exam',
    example: 50,
  })
  likeCount: number;
}

export class LikeExamResponse extends MessageResponse {
  @ApiProperty({
    description: 'Like exam data',
    type: LikeExamData,
  })
  data: LikeExamData;
}

