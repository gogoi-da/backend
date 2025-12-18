// Standard packages
import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { UpdateExamDto } from '../dto';
import { UpdateExamResponse } from '../response';

export const UpdateExamDocs = applyDecorators(
  ApiOperation({
    summary: 'Update an exam',
    description: 'Update exam details by ID',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Exam ID',
    required: true,
    type: String,
  }),
  ApiBody({
    type: UpdateExamDto,
  }),
  ApiOkResponse({
    type: UpdateExamResponse,
  }),
);

