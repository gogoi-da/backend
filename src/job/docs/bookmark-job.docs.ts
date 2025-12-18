import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { BookmarkJobResponse } from '../response';

export const BookmarkJobDocs = applyDecorators(
  ApiOperation({
    summary: 'Toggle bookmark/unbookmark job',
    description: 'Bookmark a job if not bookmarked, or unbookmark it if already bookmarked. Returns the updated bookmark status.',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Job ID',
    required: true,
    type: String,
  }),
  ApiOkResponse({
    type: BookmarkJobResponse,
  }),
);
