// Standard packages
import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { GetJobsResponse } from '../response';

// Custom packages

export const GetJobsDocs = applyDecorators(
  ApiOperation({
    summary: 'Get list of jobs',
    description: 'Get paginated list of jobs with search and tag filtering',
  }),
  ApiBearerAuth('access-token'),
  ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  }),
  ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (default: 10)',
  }),
  ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search term to filter by heading or company name',
  }),
  ApiQuery({
    name: 'tags',
    required: false,
    type: [String],
    description: 'Filter jobs by tags',
    isArray: true,
  }),
  ApiOkResponse({
    type: GetJobsResponse,
  }),
);

