import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { GetTestQuestionsListResponse } from '../response';

export const GetTestQuestionsListDocs = applyDecorators(
  ApiOperation({
    summary: 'Get all questions under a test',
    description: 'Retrieves a paginated list of questions that belong to a specific test',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'Test ID',
    example: '507f1f77bcf86cd799439011',
  }),
  ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
    example: 1,
  }),
  ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
    example: 10,
  }),
  ApiOkResponse({
    type: GetTestQuestionsListResponse,
  }),
);

