import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateTestSeriesDto } from '../dto';
import { CreateTestSeriesResponse } from '../response';

export const CreateTestSeriesDocs = applyDecorators(
  ApiOperation({
    summary: 'Create a new test series',
    description: 'Creates a new test series with exam ID, name, description, and other optional fields',
  }),
  ApiBearerAuth('access-token'),
  ApiBody({
    type: CreateTestSeriesDto,
  }),
  ApiOkResponse({
    type: CreateTestSeriesResponse,
  }),
);

