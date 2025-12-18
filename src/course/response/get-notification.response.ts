import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class NotificationDetailData {
  @ApiProperty({ description: 'Notification ID', example: '507f1f77bcf86cd799439011' })
  id: string;

  @ApiProperty({ description: 'Exam ID', example: '507f1f77bcf86cd799439011' })
  examId: string;

  @ApiProperty({ description: 'Notification heading', example: 'Important Exam Update' })
  heading: string;

  @ApiProperty({
    description: 'Notification description',
    example: 'The exam date has been updated to next month',
    nullable: true,
    required: false,
  })
  description: string | null;

  @ApiProperty({
    description: 'Notification URL',
    example: 'https://example.com/notification',
    nullable: true,
    required: false,
  })
  url: string | null;

  @ApiProperty({
    description: 'Tags',
    example: ['important', 'update', 'exam'],
    type: [String],
  })
  tags: string[];

  @ApiProperty({ description: 'Status', example: 'active' })
  status: string;

  @ApiProperty({ description: 'Created at timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated at timestamp' })
  updatedAt: Date;
}

export class GetNotificationResponse extends MessageResponse {
  @ApiProperty({ description: 'Notification details', type: NotificationDetailData })
  data: NotificationDetailData;
}

