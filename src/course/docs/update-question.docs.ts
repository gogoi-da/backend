import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { UpdateQuestionDto } from '../dto';
import { UpdateQuestionResponse } from '../response';

export const UpdateQuestionDocs = applyDecorators(
  ApiOperation({
    summary: 'Update a question',
    description: 'Update question details by ID',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Question ID',
    required: true,
    type: String,
  }),
  ApiBody({
    type: UpdateQuestionDto,
  }),
  ApiOkResponse({
    type: UpdateQuestionResponse,
  }),
);

