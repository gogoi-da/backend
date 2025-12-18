import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

export class DeleteNotificationResponse extends MessageResponse {
  @ApiProperty({
    description: 'Deleted notification ID',
    example: '507f1f77bcf86cd799439011',
  })
  data: {
    id: string;
  };
}

