import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class SubjectDetail {
  @ApiProperty({
    description: 'Subject ID',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({
    description: 'Subject name',
    example: 'Mathematics',
  })
  name: string;

  @ApiProperty({
    description: 'Subject description',
    example: 'Mathematics subject covering algebra, geometry, and calculus',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    description: 'Is premium',
    example: false,
  })
  isPremium: boolean;

  @ApiProperty({
    description: 'Total number of lessons in this subject',
    example: 10,
  })
  lessonCount: number;

  @ApiProperty({
    description: 'Total number of questions across all lessons in this subject',
    example: 250,
  })
  totalQuestions: number;
}

class NotificationDetail {
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

  @ApiProperty({
    description: 'Created at timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;
}

class ExamDetailsData {
  @ApiProperty({
    description: 'Exam name',
    example: 'SI',
  })
  name: string;

  @ApiProperty({
    description: 'Organization',
    example: 'Maharashtra Police Department',
  })
  organization: string;

  @ApiProperty({
    description: 'Exam image URL',
    example: 'https://example.com/exam-image.png',
    nullable: true,
  })
  image: string | null;

  @ApiProperty({
    description: 'Like count',
    example: 50,
  })
  likeCount: number;

  @ApiProperty({
    description: 'Whether the current user has liked this exam',
    example: true,
  })
  isLiked: boolean;

  @ApiProperty({
    description: 'List of subjects with lesson and question counts',
    type: [SubjectDetail],
  })
  subjects: SubjectDetail[];

  @ApiProperty({
    description: 'List of notifications for this exam',
    type: [NotificationDetail],
  })
  notifications: NotificationDetail[];
}

export class GetExamDetailsResponse extends MessageResponse {
  @ApiProperty({
    description: 'Exam details with subjects and notifications',
    type: ExamDetailsData,
  })
  data: ExamDetailsData;
}

