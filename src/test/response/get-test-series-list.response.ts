import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class TestSeriesItem {
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
    description: 'Total number of tests in this series',
    example: 10,
  })
  totalTests: number;

  @ApiProperty({
    description: 'Whether the test series is active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Whether this test series is liked by the current user',
    example: true,
  })
  isLiked: boolean;

  @ApiProperty({
    description: 'Total number of likes for this test series',
    example: 50,
  })
  totalLikes: number;

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

class TestSeriesListData {
  @ApiProperty({
    description: 'List of test series',
    type: [TestSeriesItem],
  })
  testSeries: TestSeriesItem[];
}

export class GetTestSeriesListResponse extends MessageResponse {
  @ApiProperty({
    description: 'Test series list',
    type: TestSeriesListData,
  })
  data: TestSeriesListData;
}

