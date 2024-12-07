import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateRooftopDto {
  @ApiProperty({ example: 'Sunset Terrace' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Beautiful rooftop with amazing sunset views' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'New York' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 20 })
  @IsNumber()
  @Min(1)
  capacity: number;

  @ApiProperty({ example: 50.0 })
  @IsNumber()
  @Min(0)
  pricePerHour: number;

  @ApiProperty({ example: ['https://example.com/image1.jpg'] })
  @IsArray()
  @IsString({ each: true })
  images: string[];
} 