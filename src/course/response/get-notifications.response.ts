import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class NotificationListItem {
  @ApiProperty({
    description: 'Notification ID',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({
    description: 'Exam ID',
    example: '507f1f77bcf86cd799439011',
  })
  examId: string;

  @ApiProperty({
    description: 'Notification heading',
    example: 'Important Exam Update',
  })
  heading: string;

  @ApiProperty({
    description: 'Notification description',
    example: 'The exam date has been updated to next month',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    description: 'Notification URL',
    example: 'https://example.com/notification',
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
}

class PaginationMeta {
  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  limit: number;

  @ApiProperty({
    description: 'Total number of notifications',
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 10,
  })
  totalPages: number;
}

class GetNotificationsData {
  @ApiProperty({
    description: 'List of notifications',
    type: [NotificationListItem],
  })
  notifications: NotificationListItem[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMeta,
  })
  meta: PaginationMeta;
}

export class GetNotificationsResponse extends MessageResponse {
  @ApiProperty({
    description: 'Notifications data with pagination',
    type: GetNotificationsData,
  })
  data: GetNotificationsData;
}

