import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class LikeTestSeriesData {
  @ApiProperty({
    description: 'Test Series ID',
    example: '507f1f77bcf86cd799439011',
  })
  testSeriesId: string;

  @ApiProperty({
    description: 'Whether the test series is liked by the user',
    example: true,
  })
  isLiked: boolean;

  @ApiProperty({
    description: 'Current like count for the test series',
    example: 50,
  })
  likeCount: number;
}

export class LikeTestSeriesResponse extends MessageResponse {
  @ApiProperty({
    description: 'Like test series data',
    type: LikeTestSeriesData,
  })
  data: LikeTestSeriesData;
}
