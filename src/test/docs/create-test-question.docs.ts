import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateTestQuestionDto } from '../dto';
import { CreateTestQuestionResponse } from '../response';

export const CreateTestQuestionDocs = applyDecorators(
  ApiOperation({
    summary: 'Create a new test question',
    description: 'Creates a new test question with test ID, type, statement, marks, and other optional fields',
  }),
  ApiBearerAuth('access-token'),
  ApiBody({
    type: CreateTestQuestionDto,
  }),
  ApiOkResponse({
    type: CreateTestQuestionResponse,
  }),
);

