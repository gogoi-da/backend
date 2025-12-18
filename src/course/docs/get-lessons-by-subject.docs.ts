import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { GetLessonsBySubjectResponse } from '../response';

export const GetLessonsBySubjectDocs = applyDecorators(
  ApiOperation({
    summary: 'Get lessons by subject',
    description: 'Retrieve all lessons under a subject with tags, total time, total questions, and total bookmarked questions count',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'subjectId',
    description: 'Subject ID',
    required: true,
    type: String,
  }),
  ApiOkResponse({
    type: GetLessonsBySubjectResponse,
  }),
);

