import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { BookmarkQuestionResponse } from '../response';

export const BookmarkQuestionDocs = applyDecorators(
  ApiOperation({
    summary: 'Toggle bookmark/unbookmark question',
    description: 'Bookmark a question if not bookmarked, or unbookmark it if already bookmarked. Returns the updated bookmark status.',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Question ID',
    required: true,
    type: String,
  }),
  ApiOkResponse({
    type: BookmarkQuestionResponse,
  }),
);

