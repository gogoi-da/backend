// Standard packages
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateJobDto } from '../dto';
import { CreateJobResponse } from '../response';

// Custom packages

export const CreateJobDocs = applyDecorators(
  ApiOperation({
    summary: 'Create a new job',
    description: 'Creates a new job posting with optional openings, important dates, and links',
  }),
  ApiBearerAuth('access-token'),
  ApiBody({
    type: CreateJobDto,
  }),
  ApiOkResponse({
    type: CreateJobResponse,
  }),
);

