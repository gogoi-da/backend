import { ApiProperty } from '@nestjs/swagger';
import { Tokens } from './tokens.response';
import { MessageResponse } from 'src/response';

export class RefreshResponse extends MessageResponse {
  @ApiProperty({
    description: 'Authentication tokens',
    type: Tokens,
  })
  data: Tokens;
}

