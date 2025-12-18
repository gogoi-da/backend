// Standard packages
import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { GetExamResponse } from '../response';

// Documents the get single exam endpoint
export const GetExamDocs = applyDecorators(
  ApiOperation({
    summary: 'Get exam by ID',
    description: 'Retrieve full details of an exam by its ID',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Exam ID',
    required: true,
    type: String,
  }),
  ApiOkResponse({
    type: GetExamResponse,
  }),
);

