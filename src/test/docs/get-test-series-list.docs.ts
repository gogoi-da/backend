import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { GetTestSeriesListResponse } from '../response';

export const GetTestSeriesListDocs = applyDecorators(
  ApiOperation({
    summary: 'Get list of test series',
    description: 'Retrieves a list of test series filtered by exam ID',
  }),
  ApiBearerAuth('access-token'),
  ApiQuery({
    name: 'examId',
    required: true,
    type: String,
    description: 'Filter by exam ID',
    example: '507f1f77bcf86cd799439011',
  }),
  ApiOkResponse({
    type: GetTestSeriesListResponse,
  }),
);

