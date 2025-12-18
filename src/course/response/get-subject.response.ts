import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class SubjectDetailData {
  @ApiProperty({ description: 'Subject ID', example: '507f1f77bcf86cd799439011' })
  id: string;

  @ApiProperty({ description: 'Exam ID', example: '507f1f77bcf86cd799439011' })
  examId: string;

  @ApiProperty({ description: 'Subject name', example: 'Mathematics' })
  name: string;

  @ApiProperty({
    description: 'Subject description',
    example: 'Mathematics subject covering algebra, geometry, and calculus',
    nullable: true,
    required: false,
  })
  description: string | null;

  @ApiProperty({ description: 'Is premium', example: false })
  isPremium: boolean;

  @ApiProperty({ description: 'Is active', example: true })
  isActive: boolean;

  @ApiProperty({ description: 'Number of lessons in this subject', example: 10 })
  lessonCount: number;

  @ApiProperty({ description: 'Created at timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated at timestamp' })
  updatedAt: Date;
}

export class GetSubjectResponse extends MessageResponse {
  @ApiProperty({ description: 'Subject details', type: SubjectDetailData })
  data: SubjectDetailData;
}

