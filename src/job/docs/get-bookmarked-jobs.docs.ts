// Standard packages
import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { GetBookmarkedJobsResponse } from '../response';

export const GetBookmarkedJobsDocs = applyDecorators(
  ApiOperation({
    summary: 'Get list of bookmarked jobs',
    description: 'Get paginated list of jobs bookmarked by the current user',
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
  ApiOkResponse({
    type: GetBookmarkedJobsResponse,
  }),
);
