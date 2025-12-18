import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { GetQuestionsResponse } from '../response';

export const GetQuestionsDocs = applyDecorators(
  ApiOperation({
    summary: 'Get list of questions',
    description: 'Get paginated list of questions with search, lesson, and type filtering',
  }),
  ApiBearerAuth('access-token'),
  ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  }),
  ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (default: 10)',
  }),
  ApiQuery({
    name: 'lessonId',
    required: false,
    type: String,
    description: 'Filter by lesson ID',
  }),
  ApiQuery({
    name: 'type',
    required: false,
    type: String,
    description: 'Filter by question type',
    enum: ['mcq', 'multiple_select', 'coding', 'subjective', 'true_false', 'fill_blank'],
  }),
  ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search term to filter by statement',
  }),
  ApiOkResponse({
    type: GetQuestionsResponse,
  }),
);

