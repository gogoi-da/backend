import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { LikeExamResponse } from '../response';

export const LikeExamDocs = applyDecorators(
  ApiOperation({
    summary: 'Toggle like/unlike exam',
    description: 'Like an exam if not liked, or unlike it if already liked. Returns the updated like status and count.',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Exam ID',
    required: true,
    type: String,
  }),
  ApiOkResponse({
    type: LikeExamResponse,
  }),
);

