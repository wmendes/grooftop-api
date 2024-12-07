import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsString()
  @IsNotEmpty()
  rooftopId: string;

  @ApiProperty({ example: '2024-01-20T14:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({ example: '2024-01-20T18:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  endTime: string;
} 