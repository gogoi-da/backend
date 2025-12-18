// Standard packages
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateExamDto } from '../dto';
import { CreateExamResponse } from '../response';

// Custom packages

export const CreateExamDocs = applyDecorators(
  ApiOperation({
    summary: 'Create a new exam',
    description: 'Creates a new exam with all required and optional fields',
  }),
  ApiBearerAuth('access-token'),
  ApiBody({
    type: CreateExamDto,
  }),
  ApiOkResponse({
    type: CreateExamResponse,
  }),
);

