import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateLessonDto } from '../dto';
import { CreateLessonResponse } from '../response';

export const CreateLessonDocs = applyDecorators(
  ApiOperation({
    summary: 'Create a new lesson',
    description: 'Creates a new lesson for a subject',
  }),
  ApiBearerAuth('access-token'),
  ApiBody({
    type: CreateLessonDto,
  }),
  ApiOkResponse({
    type: CreateLessonResponse,
  }),
);

