import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { DeleteLessonResponse } from '../response';

export const DeleteLessonDocs = applyDecorators(
  ApiOperation({
    summary: 'Delete a lesson',
    description: 'Delete a lesson by ID',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Lesson ID',
    required: true,
    type: String,
  }),
  ApiOkResponse({
    type: DeleteLessonResponse,
  }),
);

