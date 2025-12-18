// Standard packages
import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { GetJobResponse } from '../response';

// Documents the get single job endpoint
export const GetJobDocs = applyDecorators(
  ApiOperation({
    summary: 'Get job by ID',
    description: 'Retrieve full details of a job by its ID',
  }),
  ApiBearerAuth('access-token'),
  ApiParam({
    name: 'id',
    description: 'Job ID',
    required: true,
    type: String,
  }),
  ApiOkResponse({
    type: GetJobResponse,
  }),
);
