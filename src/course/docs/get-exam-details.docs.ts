import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { GetExamDetailsResponse } from '../response';

export const GetExamDetailsDocs = applyDecorators(
  ApiOperation({
    summary: 'Get exam details with subjects and notifications',
    description: 'Retrieve exam basic details along with subjects (with lesson/question counts) and notifications',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Exam ID',
    required: true,
    type: String,
  }),
  ApiOkResponse({
    type: GetExamDetailsResponse,
  }),
);

