// Standard packages
import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SetExamIdResponse } from '../response';

// Custom packages

export const SetExamIdDocs = applyDecorators(
  ApiOperation({
    summary: 'Set exam ID for user',
    description: 'Updates the exam ID that the user is preparing for',
  }),
  ApiBearerAuth('access-token'),
  ApiOkResponse({
    type: SetExamIdResponse,
  }),
);

