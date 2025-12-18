export * from './getProfile.docs';
export * from './setExamId.docs';

import { applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const UserDocs = {
  Controller: applyDecorators(ApiTags('User - API')),
};