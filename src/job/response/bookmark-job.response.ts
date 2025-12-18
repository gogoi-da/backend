import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class BookmarkJobData {
  @ApiProperty({
    description: 'Job ID',
    example: '507f1f77bcf86cd799439011',
  })
  jobId: string;

  @ApiProperty({
    description: 'Whether the job is bookmarked by the user',
    example: true,
  })
  isBookmarked: boolean;
}

export class BookmarkJobResponse extends MessageResponse {
  @ApiProperty({
    description: 'Bookmark job data',
    type: BookmarkJobData,
  })
  data: BookmarkJobData;
}
