// Standard packages
import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { GetExamsResponse } from '../response';

// Custom packages

export const GetExamsDocs = applyDecorators(
  ApiOperation({
    summary: 'Get list of exams',
    description: 'Get paginated list of exams with search filtering',
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
    description: 'Search term to filter by name or organization',
  }),
  ApiOkResponse({
    type: GetExamsResponse,
  }),
);

