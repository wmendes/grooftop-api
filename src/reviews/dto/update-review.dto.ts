import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateReviewDto {
  @ApiProperty({ example: 5, description: 'Rating from 1 to 5', required: false })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @ApiProperty({ example: 'Great rooftop with amazing views!', required: false })
  @IsString()
  @IsOptional()
  comment?: string;
} 