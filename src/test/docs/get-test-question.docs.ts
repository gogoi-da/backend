import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { GetTestQuestionResponse } from '../response';

export const GetTestQuestionDocs = applyDecorators(
  ApiOperation({
    summary: 'Get a test question by ID',
    description: 'Retrieves detailed information about a specific test question',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Test Question ID',
    example: '507f1f77bcf86cd799439011',
  }),
  ApiOkResponse({
    type: GetTestQuestionResponse,
  }),
);

