import { ApiProperty } from '@nestjs/swagger';

export class Tokens {
  @ApiProperty({ description: 'access token', example: '1234567890' })
  access_token: string;

  @ApiProperty({ description: 'refresh token', example: '1234567890' })
  refresh_token: string;
}
