// Standard packages
import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { DeleteExamResponse } from '../response';

export const DeleteExamDocs = applyDecorators(
  ApiOperation({
    summary: 'Delete an exam',
    description: 'Delete an exam by ID',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Exam ID',
    required: true,
    type: String,
  }),
  ApiOkResponse({
    type: DeleteExamResponse,
  }),
);

