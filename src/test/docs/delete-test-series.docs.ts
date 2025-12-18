import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { DeleteTestSeriesResponse } from '../response';

export const DeleteTestSeriesDocs = applyDecorators(
  ApiOperation({
    summary: 'Delete a test series',
    description: 'Deletes a test series by ID',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Test series ID',
    example: '507f1f77bcf86cd799439011',
  }),
  ApiOkResponse({
    type: DeleteTestSeriesResponse,
  }),
);

