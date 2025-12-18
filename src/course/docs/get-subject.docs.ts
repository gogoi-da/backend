import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { GetSubjectResponse } from '../response';

export const GetSubjectDocs = applyDecorators(
  ApiOperation({
    summary: 'Get subject by ID',
    description: 'Retrieve full details of a subject by its ID',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Subject ID',
    required: true,
    type: String,
  }),
  ApiOkResponse({
    type: GetSubjectResponse,
  }),
);

