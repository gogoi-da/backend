import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { GetNotificationsResponse } from '../response';

export const GetNotificationsDocs = applyDecorators(
  ApiOperation({
    summary: 'Get list of notifications',
    description: 'Get paginated list of notifications with search, exam, and status filtering',
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
    name: 'status',
    required: false,
    type: String,
    description: 'Filter by status',
    enum: ['active', 'inactive', 'draft', 'published'],
  }),
  ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search term to filter by heading or description',
  }),
  ApiOkResponse({
    type: GetNotificationsResponse,
  }),
);

