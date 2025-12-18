import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { GetTestsListResponse } from '../response';

export const GetTestsByTestSeriesDocs = applyDecorators(
  ApiOperation({
    summary: 'Get all tests under a test series',
    description: 'Retrieves all tests that belong to a specific test series',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'Test Series ID',
    example: '507f1f77bcf86cd799439011',
  }),
  ApiOkResponse({
    type: GetTestsListResponse,
  }),
);

