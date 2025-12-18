export * from './signup.docs';
export * from './signin.docs';
export * from './refresh.docs';

import { applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const AuthDocs = {
  Controller: applyDecorators(ApiTags('Auth - API')),
};