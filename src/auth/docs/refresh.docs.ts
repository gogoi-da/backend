// Standard packages
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { RefreshDto } from '../dto';
import { RefreshResponse } from '../response';

// Custom packages

export const RefreshDocs = applyDecorators(
  ApiOperation({
    summary: 'Refresh access token',
    description: 'Refresh the access token using a valid refresh token',
  }),
  ApiBody({
    type: RefreshDto,
  }),
  ApiOkResponse({
    type: RefreshResponse,
  }),
);

