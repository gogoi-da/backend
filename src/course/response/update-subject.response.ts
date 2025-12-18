import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class UpdateSubjectData {
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
    required: false,
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    description: 'Is premium',
    example: false,
  })
  isPremium: boolean;

  @ApiProperty({
    description: 'Is active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Number of lessons in this subject',
    example: 10,
  })
  lessonCount: number;

  @ApiProperty({
    description: 'Updated at timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}

export class UpdateSubjectResponse extends MessageResponse {
  @ApiProperty({
    description: 'Updated subject data',
    type: UpdateSubjectData,
  })
  data: UpdateSubjectData;
}

