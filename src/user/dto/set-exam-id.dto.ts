import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetExamIdDto {
  @ApiProperty({
    description: 'Exam ID to set for the user',
    example: '691893a95a0232b7b02e82d8',
  })
  @IsString()
  @IsNotEmpty()
  examId: string;
}

