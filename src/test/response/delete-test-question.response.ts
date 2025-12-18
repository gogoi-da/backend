import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

export class DeleteTestQuestionResponse extends MessageResponse {
  @ApiProperty({
    description: 'Deleted test question ID',
    example: '507f1f77bcf86cd799439011',
    required: false,
  })
  data?: {
    id: string;
  };
}

