import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class JobData {
  @ApiProperty({
    description: 'Job ID',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({
    description: 'Job heading',
    example: 'Maharashtra Police Recruitment 2024',
  })
  heading: string;

  @ApiProperty({
    description: 'Company name',
    example: 'Maharashtra Police Department',
  })
  companyName: string;

  @ApiProperty({
    description: 'Company logo URL',
    example: 'https://example.com/logo.png',
    required: false,
    nullable: true,
  })
  companyLogoUrl: string | null;

  @ApiProperty({
    description: 'Company details',
    example: 'Government organization',
    required: false,
    nullable: true,
  })
  companyDetails: string | null;

  @ApiProperty({
    description: 'Last date to apply',
    example: '2024-12-31T23:59:59.000Z',
  })
  lastDateToApply: Date;

  @ApiProperty({
    description: 'YouTube video URL',
    example: 'https://www.youtube.com/watch?v=example',
    required: false,
    nullable: true,
  })
  youtubeVideoUrl: string | null;

  @ApiProperty({
    description: 'Tags',
    example: ['SI', 'CONSTABLE'],
    type: [String],
  })
  tags: string[];

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

export class CreateJobResponse extends MessageResponse {
  @ApiProperty({
    description: 'Created job data',
    type: JobData,
  })
  data: JobData;
}

