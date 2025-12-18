import { IsString, IsNotEmpty, IsOptional, IsArray, IsUrl, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({
    description: 'Exam ID',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  examId: string;

  @ApiProperty({
    description: 'Notification heading',
    example: 'Important Exam Update',
  })
  @IsString()
  @IsNotEmpty()
  heading: string;

  @ApiProperty({
    description: 'Notification description',
    example: 'The exam date has been updated to next month',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Notification URL',
    example: 'https://example.com/notification',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  url?: string;

  @ApiProperty({
    description: 'Tags for the notification',
    example: ['important', 'update', 'exam'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    description: 'Notification status',
    example: 'active',
    enum: ['active', 'inactive', 'draft', 'published'],
    default: 'draft',
    required: false,
  })
  @IsString()
  @IsIn(['active', 'inactive', 'draft', 'published'])
  @IsOptional()
  status?: string;
}

