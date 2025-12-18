import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { UpdateTestQuestionDto } from '../dto';
import { UpdateTestQuestionResponse } from '../response';

export const UpdateTestQuestionDocs = applyDecorators(
  ApiOperation({
    summary: 'Update a test question',
    description: 'Updates an existing test question with provided fields',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Test Question ID',
    example: '507f1f77bcf86cd799439011',
  }),
  ApiBody({
    type: UpdateTestQuestionDto,
  }),
  ApiOkResponse({
    type: UpdateTestQuestionResponse,
  }),
);

