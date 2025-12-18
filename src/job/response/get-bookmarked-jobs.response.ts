import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class JobListItem {
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
    nullable: true,
  })
  companyLogoUrl: string | null;

  @ApiProperty({
    description: 'Last date to apply',
    example: '2024-12-31T23:59:59.000Z',
  })
  lastDateToApply: Date;

  @ApiProperty({
    description: 'Total number of posts across all openings',
    example: 150,
  })
  totalPost: number;

  @ApiProperty({
    description: 'Location(s) from openings',
    example: ['Mumbai, Maharashtra', 'Pune, Maharashtra'],
    type: [String],
  })
  locations: string[];

  @ApiProperty({
    description: 'Salary range from openings',
    example: 'Rs. 25,000 - Rs. 35,000',
  })
  salary: string;

  @ApiProperty({
    description: 'Tags',
    example: ['SI', 'CONSTABLE'],
    type: [String],
  })
  tags: string[];

  @ApiProperty({
    description: 'Whether this job is bookmarked by the current user',
    example: true,
  })
  isBookmarked: boolean;
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
    description: 'Total number of bookmarked jobs',
    example: 25,
  })
  total: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 3,
  })
  totalPages: number;
}

class GetBookmarkedJobsData {
  @ApiProperty({
    description: 'List of bookmarked jobs',
    type: [JobListItem],
  })
  jobs: JobListItem[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMeta,
  })
  meta: PaginationMeta;
}

export class GetBookmarkedJobsResponse extends MessageResponse {
  @ApiProperty({
    description: 'Bookmarked jobs with pagination',
    type: GetBookmarkedJobsData,
  })
  data: GetBookmarkedJobsData;
}
