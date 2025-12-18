// Standard packages
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SignupDto } from '../dto';
import { SignupResponse } from '../response';

// Custom packages

export const SignupDocs = applyDecorators(
  ApiOperation({
    summary: 'Signup new user',
  }),
  ApiBody({
    type: SignupDto,
  }),
  ApiOkResponse({
    type: SignupResponse,
  }),
);