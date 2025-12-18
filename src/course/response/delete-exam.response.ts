import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

export class DeleteExamResponse extends MessageResponse {
  @ApiProperty({
    description: 'Deleted exam ID',
    example: '507f1f77bcf86cd799439011',
  })
  data: {
    id: string;
  };
}

