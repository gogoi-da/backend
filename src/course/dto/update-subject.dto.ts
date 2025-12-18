import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSubjectDto {
  @ApiProperty({
    description: 'Subject name',
    example: 'Mathematics',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Subject description',
    example: 'Mathematics subject covering algebra, geometry, and calculus',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Whether the subject is premium',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isPremium?: boolean;

  @ApiProperty({
    description: 'Whether the subject is active',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

