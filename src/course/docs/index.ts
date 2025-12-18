export * from './create-exam.docs';
export * from './get-exam.docs';
export * from './get-exams.docs';
export * from './update-exam.docs';
export * from './delete-exam.docs';
export * from './create-subject.docs';
export * from './get-subject.docs';
export * from './get-subjects.docs';
export * from './update-subject.docs';
export * from './delete-subject.docs';
export * from './create-lesson.docs';
export * from './get-lesson.docs';
export * from './get-lessons.docs';
export * from './update-lesson.docs';
export * from './delete-lesson.docs';
export * from './create-question.docs';
export * from './get-question.docs';
export * from './get-questions.docs';
export * from './update-question.docs';
export * from './delete-question.docs';
export * from './create-notification.docs';
export * from './get-notification.docs';
export * from './get-notifications.docs';
export * from './update-notification.docs';
export * from './delete-notification.docs';
export * from './get-exam-details.docs';
export * from './like-exam.docs';
export * from './get-lessons-by-subject.docs';
export * from './get-questions-by-lesson.docs';
export * from './bookmark-question.docs';

import { applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const CourseDocs = {
  Controller: applyDecorators(ApiTags('Course - API')),
};

