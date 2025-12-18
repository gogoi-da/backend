export * from './create-job.docs';
export * from './get-jobs.docs';
export * from './get-job.docs';
export * from './bookmark-job.docs';
export * from './get-bookmarked-jobs.docs';

import { applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const JobDocs = {
  Controller: applyDecorators(ApiTags('Job - API')),
};

