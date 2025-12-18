import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { DeleteNotificationResponse } from '../response';

export const DeleteNotificationDocs = applyDecorators(
  ApiOperation({
    summary: 'Delete a notification',
    description: 'Delete a notification by ID',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Notification ID',
    required: true,
    type: String,
  }),
  ApiOkResponse({
    type: DeleteNotificationResponse,
  }),
);

