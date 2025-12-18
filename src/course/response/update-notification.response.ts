import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class UpdateNotificationData {
  @ApiProperty({
    description: 'Notification ID',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({
    description: 'Notification heading',
    example: 'Important Exam Update',
  })
  heading: string;

  @ApiProperty({
    description: 'Notification description',
    example: 'The exam date has been updated to next month',
    required: false,
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    description: 'Notification URL',
    example: 'https://example.com/notification',
    required: false,
    nullable: true,
  })
  url: string | null;

  @ApiProperty({
    description: 'Tags',
    example: ['important', 'update', 'exam'],
    type: [String],
  })
  tags: string[];

  @ApiProperty({
    description: 'Status',
    example: 'active',
  })
  status: string;

  @ApiProperty({
    description: 'Updated at timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}

export class UpdateNotificationResponse extends MessageResponse {
  @ApiProperty({
    description: 'Updated notification data',
    type: UpdateNotificationData,
  })
  data: UpdateNotificationData;
}

