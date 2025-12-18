import { ApiProperty } from "@nestjs/swagger";
import { MessageResponse } from "src/response";

export class UserDetailsResponse  {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'User full name',
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
};

export class GetProfileResponse extends MessageResponse {
    @ApiProperty({
        description: 'User profile details',
        type: UserDetailsResponse,
    })
    data: UserDetailsResponse;
}