import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { DeleteTestResponse } from '../response';

export const DeleteTestDocs = applyDecorators(
  ApiOperation({
    summary: 'Delete a test',
    description: 'Deletes a test by ID',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Test ID',
    example: '507f1f77bcf86cd799439011',
  }),
  ApiOkResponse({
    type: DeleteTestResponse,
  }),
);

