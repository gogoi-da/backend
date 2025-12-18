import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { GetQuestionsByLessonResponse } from '../response';

export const GetQuestionsByLessonDocs = applyDecorators(
  ApiOperation({
    summary: 'Get questions by lesson',
    description: 'Retrieve questions under a lesson with pagination. Supports filtering by tags and bookmarked questions by the current user.',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'lessonId',
    description: 'Lesson ID',
    required: true,
    type: String,
  }),
  ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination',
    example: 1,
  }),
  ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
    example: 10,
  }),
  ApiQuery({
    name: 'bookmarked',
    required: false,
    type: Boolean,
    description: 'Bookmark filter. If true, returns only bookmarked questions. If false or undefined, returns all questions.',
    example: false,
  }),
  ApiQuery({
    name: 'tags',
    required: false,
    type: [String],
    description: 'Filter questions by tags. Returns questions that match any of the provided tags.',
    example: ['arithmetic', 'algebra'],
    isArray: true,
  }),
  ApiOkResponse({
    type: GetQuestionsByLessonResponse,
  }),
);

