// Standard packages
import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { GetProfileResponse } from '../response';

// Custom packages

export const GetProfileDocs = applyDecorators(
  ApiOperation({
    summary: 'Get user profile',
  }),
  ApiBearerAuth('access-token'),
  ApiOkResponse({
    type: GetProfileResponse,
  }),
);