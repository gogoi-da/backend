import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from 'src/response';

class UserData {
  @ApiProperty({
    description: 'User ID',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({
    description: 'User email',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'User phone number',
    example: '+1234567890',
  })
  phone: string;

  @ApiProperty({
    description: 'User preferred language',
    example: 'en',
  })
  language: string;

  @ApiProperty({
    description: 'Whether user has premium access',
    example: false,
  })
  isPremium: boolean;

  @ApiProperty({
    description: 'Whether this is the user\'s first login',
    example: true,
  })
  isFirstLogin: boolean;

  @ApiProperty({
    description: 'Exam ID the user is preparing for',
    example: '691893a95a0232b7b02e82d8',
  })
  examId: string;
}

class SigninData {
  @ApiProperty({
    description: 'Access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string;

  @ApiProperty({
    description: 'Refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refresh_token: string;

  @ApiProperty({
    description: 'User data',
    type: UserData,
  })
  user: UserData;
}

export class SigninResponse extends MessageResponse {
  @ApiProperty({
    description: 'Authentication data with tokens and user info',
    type: SigninData,
  })
  data: SigninData;
}
