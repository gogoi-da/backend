import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class OpeningItem {
  @ApiProperty({ description: 'Name of the post', example: 'Police Constable' })
  nameOfPost: string;

  @ApiProperty({ description: 'Total posts', example: 100 })
  totalPost: number;

  @ApiProperty({ description: 'Salary', example: 'Rs. 25,000 - Rs. 35,000' })
  salary: string;

  @ApiProperty({ description: 'Job details', example: 'Full-time position' })
  jobDetails: string;

  @ApiProperty({ description: 'Eligibility criteria', example: 'Graduate' })
  eligibilityCriteria: string;

  @ApiProperty({ description: 'Location', example: 'Mumbai, Maharashtra' })
  location: string;
}

class ImportantDateItem {
  @ApiProperty({ description: 'Event name', example: 'Last Date to Apply' })
  event: string;

  @ApiProperty({ description: 'Date', example: '2024-12-31T23:59:59.000Z' })
  date: Date;
}

class ImportantLinkItem {
  @ApiProperty({ description: 'Link name', example: 'Official Notification' })
  name: string;

  @ApiProperty({ description: 'URL', example: 'https://example.com/notification' })
  link: string;
}

class JobDetailData {
  @ApiProperty({ description: 'Job ID', example: '507f1f77bcf86cd799439011' })
  id: string;

  @ApiProperty({ description: 'Job heading', example: 'Maharashtra Police Recruitment 2024' })
  heading: string;

  @ApiProperty({ description: 'Company name', example: 'Maharashtra Police Department' })
  companyName: string;

  @ApiProperty({ description: 'Company logo URL', example: 'https://example.com/logo.png', nullable: true, required: false })
  companyLogoUrl: string | null;

  @ApiProperty({ description: 'Company details', example: 'Government organization', nullable: true, required: false })
  companyDetails: string | null;

  @ApiProperty({ description: 'Last date to apply', example: '2024-12-31T23:59:59.000Z' })
  lastDateToApply: Date;

  @ApiProperty({ description: 'YouTube video URL', example: 'https://www.youtube.com/watch?v=example', nullable: true, required: false })
  youtubeVideoUrl: string | null;

  @ApiProperty({ description: 'Tags', type: [String], example: ['SI', 'CONSTABLE'] })
  tags: string[];

  @ApiProperty({ description: 'Openings', type: [OpeningItem], required: false })
  openings: OpeningItem[];

  @ApiProperty({ description: 'Important dates', type: [ImportantDateItem], required: false })
  importantDates: ImportantDateItem[];

  @ApiProperty({ description: 'Important links', type: [ImportantLinkItem], required: false })
  importantLinks: ImportantLinkItem[];

  @ApiProperty({
    description: 'Whether this job is bookmarked by the current user',
    example: true,
  })
  isBookmarked: boolean;

  @ApiProperty({ description: 'Created at timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated at timestamp' })
  updatedAt: Date;
}

export class GetJobResponse extends MessageResponse {
  @ApiProperty({ description: 'Job details', type: JobDetailData })
  data: JobDetailData;
}
