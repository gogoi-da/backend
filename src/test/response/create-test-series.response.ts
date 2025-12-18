import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class TestSeriesData {
  @ApiProperty({
    description: 'Test Series ID',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({
    description: 'Exam ID',
    example: '507f1f77bcf86cd799439011',
  })
  examId: string;

  @ApiProperty({
    description: 'Name of the test series',
    example: 'UPSC Prelims Mock Test Series 2024',
  })
  name: string;

  @ApiProperty({
    description: 'Organization that owns this test series',
    example: 'UPSC Training Institute',
  })
  organization: string;

  @ApiProperty({
    description: 'Description of the test series',
    example: 'Comprehensive mock test series for UPSC Prelims preparation',
    required: false,
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    description: 'Image URL for the test series',
    example: 'https://example.com/test-series-image.png',
    required: false,
    nullable: true,
  })
  image: string | null;

  @ApiProperty({
    description: 'Whether the test series is premium',
    example: false,
  })
  isPremium: boolean;

  @ApiProperty({
    description: 'Whether the test series is active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Created at timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Updated at timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}

export class CreateTestSeriesResponse extends MessageResponse {
  @ApiProperty({
    description: 'Created test series data',
    type: TestSeriesData,
  })
  data: TestSeriesData;
}

