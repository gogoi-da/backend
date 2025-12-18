import { IsString, IsNotEmpty, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateImportantLinkDto {
  @ApiProperty({
    description: 'Name of the link',
    example: 'Official Notification',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'URL of the link',
    example: 'https://example.com/notification',
  })
  @IsUrl()
  @IsNotEmpty()
  link: string;
}

