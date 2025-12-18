import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { GetLessonsResponse } from '../response';

export const GetLessonsDocs = applyDecorators(
  ApiOperation({
    summary: 'Get list of lessons',
    description: 'Get paginated list of lessons with search and subject filtering',
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
    name: 'subjectId',
    required: false,
    type: String,
    description: 'Filter by subject ID',
  }),
  ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search term to filter by name',
  }),
  ApiOkResponse({
    type: GetLessonsResponse,
  }),
);

