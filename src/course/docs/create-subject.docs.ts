import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateSubjectDto } from '../dto';
import { CreateSubjectResponse } from '../response';

export const CreateSubjectDocs = applyDecorators(
  ApiOperation({
    summary: 'Create a new subject',
    description: 'Creates a new subject for an exam',
  }),
  ApiBearerAuth('access-token'),
  ApiBody({
    type: CreateSubjectDto,
  }),
  ApiOkResponse({
    type: CreateSubjectResponse,
  }),
);

