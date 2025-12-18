import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateNotificationDto } from '../dto';
import { CreateNotificationResponse } from '../response';

export const CreateNotificationDocs = applyDecorators(
  ApiOperation({
    summary: 'Create a new notification',
    description: 'Creates a new notification for an exam',
  }),
  ApiBearerAuth('access-token'),
  ApiBody({
    type: CreateNotificationDto,
  }),
  ApiOkResponse({
    type: CreateNotificationResponse,
  }),
);

