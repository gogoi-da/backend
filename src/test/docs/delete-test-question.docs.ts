import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { DeleteTestQuestionResponse } from '../response';

export const DeleteTestQuestionDocs = applyDecorators(
  ApiOperation({
    summary: 'Delete a test question',
    description: 'Deletes a test question by ID',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Test Question ID',
    example: '507f1f77bcf86cd799439011',
  }),
  ApiOkResponse({
    type: DeleteTestQuestionResponse,
  }),
);

