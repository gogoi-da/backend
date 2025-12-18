import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { UpdateTestDto } from '../dto';
import { UpdateTestResponse } from '../response';

export const UpdateTestDocs = applyDecorators(
  ApiOperation({
    summary: 'Update a test',
    description: 'Updates an existing test with provided fields',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Test ID',
    example: '507f1f77bcf86cd799439011',
  }),
  ApiBody({
    type: UpdateTestDto,
  }),
  ApiOkResponse({
    type: UpdateTestResponse,
  }),
);

