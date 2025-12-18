export * from './create-test-series.docs';
export * from './get-test-series.docs';
export * from './get-test-series-list.docs';
export * from './update-test-series.docs';
export * from './delete-test-series.docs';
export * from './create-test.docs';
export * from './get-test.docs';
export * from './get-tests-by-test-series.docs';
export * from './update-test.docs';
export * from './delete-test.docs';
export * from './create-test-question.docs';
export * from './get-test-question.docs';
export * from './get-test-questions-list.docs';
export * from './update-test-question.docs';
export * from './delete-test-question.docs';
export * from './like-test-series.docs';

import { applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const TestDocs = {
  Controller: applyDecorators(ApiTags('Test Series - API')),
};

