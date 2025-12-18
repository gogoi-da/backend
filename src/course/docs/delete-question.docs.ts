import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { DeleteQuestionResponse } from '../response';

export const DeleteQuestionDocs = applyDecorators(
  ApiOperation({
    summary: 'Delete a question',
    description: 'Delete a question by ID',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Question ID',
    required: true,
    type: String,
  }),
  ApiOkResponse({
    type: DeleteQuestionResponse,
  }),
);

