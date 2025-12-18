import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { LikeTestSeriesResponse } from '../response';

export const LikeTestSeriesDocs = applyDecorators(
  ApiOperation({
    summary: 'Toggle like/unlike test series',
    description: 'Like a test series if not liked, or unlike it if already liked. Returns the updated like status and count.',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Test Series ID',
    required: true,
    type: String,
  }),
  ApiOkResponse({
    type: LikeTestSeriesResponse,
  }),
);
