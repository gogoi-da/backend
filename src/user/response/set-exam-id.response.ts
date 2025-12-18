import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class SetExamIdData {
  @ApiProperty({
    description: 'User ID',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({
    description: 'Updated exam ID',
    example: '691893a95a0232b7b02e82d8',
  })
  examId: string;
}

export class SetExamIdResponse extends MessageResponse {
  @ApiProperty({
    description: 'User with updated exam ID',
    type: SetExamIdData,
  })
  data: SetExamIdData;
}

