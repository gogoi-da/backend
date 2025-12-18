import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { GetQuestionResponse } from '../response';

export const GetQuestionDocs = applyDecorators(
  ApiOperation({
    summary: 'Get question by ID',
    description: 'Retrieve full details of a question by its ID',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Question ID',
    required: true,
    type: String,
  }),
  ApiOkResponse({
    type: GetQuestionResponse,
  }),
);

