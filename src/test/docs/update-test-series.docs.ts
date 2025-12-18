import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { UpdateTestSeriesDto } from '../dto';
import { UpdateTestSeriesResponse } from '../response';

export const UpdateTestSeriesDocs = applyDecorators(
  ApiOperation({
    summary: 'Update a test series',
    description: 'Updates an existing test series with provided fields',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Test series ID',
    example: '507f1f77bcf86cd799439011',
  }),
  ApiBody({
    type: UpdateTestSeriesDto,
  }),
  ApiOkResponse({
    type: UpdateTestSeriesResponse,
  }),
);

