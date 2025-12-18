import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { UpdateNotificationDto } from '../dto';
import { UpdateNotificationResponse } from '../response';

export const UpdateNotificationDocs = applyDecorators(
  ApiOperation({
    summary: 'Update a notification',
    description: 'Update notification details by ID',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Notification ID',
    required: true,
    type: String,
  }),
  ApiBody({
    type: UpdateNotificationDto,
  }),
  ApiOkResponse({
    type: UpdateNotificationResponse,
  }),
);

