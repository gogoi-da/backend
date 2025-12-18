import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { GetTestResponse } from '../response';

export const GetTestDocs = applyDecorators(
  ApiOperation({
    summary: 'Get a test by ID',
    description: 'Retrieves detailed information about a specific test',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Test ID',
    example: '507f1f77bcf86cd799439011',
  }),
  ApiOkResponse({
    type: GetTestResponse,
  }),
);

