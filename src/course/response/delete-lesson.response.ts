import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

export class DeleteLessonResponse extends MessageResponse {
  @ApiProperty({
    description: 'Deleted lesson ID',
    example: '507f1f77bcf86cd799439011',
  })
  data: {
    id: string;
  };
}

