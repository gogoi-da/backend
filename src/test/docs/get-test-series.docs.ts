import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { GetTestSeriesResponse } from '../response';

export const GetTestSeriesDocs = applyDecorators(
  ApiOperation({
    summary: 'Get a test series by ID',
    description: 'Retrieves detailed information about a specific test series',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Test series ID',
    example: '507f1f77bcf86cd799439011',
  }),
  ApiOkResponse({
    type: GetTestSeriesResponse,
  }),
);

