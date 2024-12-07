import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateRooftopDto {
  @ApiProperty({ example: 'Sunset Terrace', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Beautiful rooftop with amazing sunset views', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'New York', required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ example: 20, required: false })
  @IsNumber()
  @Min(1)
  @IsOptional()
  capacity?: number;

  @ApiProperty({ example: 50.0, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  pricePerHour?: number;

  @ApiProperty({ example: ['https://example.com/image1.jpg'], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];
} 