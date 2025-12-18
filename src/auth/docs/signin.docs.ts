// Standard packages
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SigninDto } from '../dto';
import { SigninResponse } from '../response';

// Custom packages

export const SigninDocs = applyDecorators(
  ApiOperation({
    summary: 'Signin existing user',
  }),
  ApiBody({
    type: SigninDto,
  }),
  ApiOkResponse({
    type: SigninResponse,
  }),
);
