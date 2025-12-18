import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { UpdateLessonDto } from '../dto';
import { UpdateLessonResponse } from '../response';

export const UpdateLessonDocs = applyDecorators(
  ApiOperation({
    summary: 'Update a lesson',
    description: 'Update lesson details by ID',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Lesson ID',
    required: true,
    type: String,
  }),
  ApiBody({
    type: UpdateLessonDto,
  }),
  ApiOkResponse({
    type: UpdateLessonResponse,
  }),
);

