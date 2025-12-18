import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateQuestionDto } from '../dto';
import { CreateQuestionResponse } from '../response';

export const CreateQuestionDocs = applyDecorators(
  ApiOperation({
    summary: 'Create a new question',
    description: 'Creates a new question for a lesson',
  }),
  ApiBearerAuth('access-token'),
  ApiBody({
    type: CreateQuestionDto,
  }),
  ApiOkResponse({
    type: CreateQuestionResponse,
  }),
);

