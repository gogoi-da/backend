import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { UpdateSubjectDto } from '../dto';
import { UpdateSubjectResponse } from '../response';

export const UpdateSubjectDocs = applyDecorators(
  ApiOperation({
    summary: 'Update a subject',
    description: 'Update subject details by ID',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Subject ID',
    required: true,
    type: String,
  }),
  ApiBody({
    type: UpdateSubjectDto,
  }),
  ApiOkResponse({
    type: UpdateSubjectResponse,
  }),
);

