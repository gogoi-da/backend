import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { GetLessonResponse } from '../response';

export const GetLessonDocs = applyDecorators(
  ApiOperation({
    summary: 'Get lesson by ID',
    description: 'Retrieve full details of a lesson by its ID',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Lesson ID',
    required: true,
    type: String,
  }),
  ApiOkResponse({
    type: GetLessonResponse,
  }),
);

