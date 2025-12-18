import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOpeningDto {
  @ApiProperty({
    description: 'Name of the post/position',
    example: 'Police Constable',
  })
  @IsString()
  @IsNotEmpty()
  nameOfPost: string;

  @ApiProperty({
    description: 'Total number of posts available',
    example: 100,
  })
  @IsInt()
  @Min(1)
  totalPost: number;

  @ApiProperty({
    description: 'Salary information',
    example: 'Rs. 25,000 - Rs. 35,000',
  })
  @IsString()
  @IsNotEmpty()
  salary: string;

  @ApiProperty({
    description: 'Detailed job information',
    example: 'Full-time position with benefits',
  })
  @IsString()
  @IsNotEmpty()
  jobDetails: string;

  @ApiProperty({
    description: 'Eligibility criteria for the position',
    example: 'Graduate with minimum 21 years of age',
  })
  @IsString()
  @IsNotEmpty()
  eligibilityCriteria: string;

  @ApiProperty({
    description: 'Job location',
    example: 'Mumbai, Maharashtra',
  })
  @IsString()
  @IsNotEmpty()
  location: string;
}

