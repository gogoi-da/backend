import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateTestDto } from '../dto';
import { CreateTestResponse } from '../response';

export const CreateTestDocs = applyDecorators(
  ApiOperation({
    summary: 'Create a new test',
    description: 'Creates a new test with test series ID, name, duration, marks, and other optional fields',
  }),
  ApiBearerAuth('access-token'),
  ApiBody({
    type: CreateTestDto,
  }),
  ApiOkResponse({
    type: CreateTestResponse,
  }),
);

