import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { GetSubjectsResponse } from '../response';

export const GetSubjectsDocs = applyDecorators(
  ApiOperation({
    summary: 'Get list of subjects',
    description: 'Get paginated list of subjects with search and exam filtering',
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
    name: 'examId',
    required: false,
    type: String,
    description: 'Filter by exam ID',
  }),
  ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search term to filter by name',
  }),
  ApiOkResponse({
    type: GetSubjectsResponse,
  }),
);

