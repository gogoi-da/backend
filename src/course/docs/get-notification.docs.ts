import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { GetNotificationResponse } from '../response';

export const GetNotificationDocs = applyDecorators(
  ApiOperation({
    summary: 'Get notification by ID',
    description: 'Retrieve full details of a notification by its ID',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Notification ID',
    required: true,
    type: String,
  }),
  ApiOkResponse({
    type: GetNotificationResponse,
  }),
);

