import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { DeleteSubjectResponse } from '../response';

export const DeleteSubjectDocs = applyDecorators(
  ApiOperation({
    summary: 'Delete a subject',
    description: 'Delete a subject by ID',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Subject ID',
    required: true,
    type: String,
  }),
  ApiOkResponse({
    type: DeleteSubjectResponse,
  }),
);

