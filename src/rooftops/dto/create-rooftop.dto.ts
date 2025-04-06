import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

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

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', required: false })
  @IsString()
  @IsUUID()
  @IsOptional()
  cancellationPolicyId?: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', required: false })
  @IsString()
  @IsUUID()
  @IsOptional()
  privacyPolicyId?: string;

  @ApiProperty({ example: ['123e4567-e89b-12d3-a456-426614174000'], required: false })
  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  accessibilityInfrastructureIds?: string[];

  @ApiProperty({ example: ['123e4567-e89b-12d3-a456-426614174000'], required: false })
  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  activityIds?: string[];

  @ApiProperty({ example: ['123e4567-e89b-12d3-a456-426614174000'], required: false })
  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  facilityIds?: string[];

  @ApiProperty({ example: ['123e4567-e89b-12d3-a456-426614174000'], required: false })
  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  featureIds?: string[];

  @ApiProperty({ example: ['123e4567-e89b-12d3-a456-426614174000'], required: false })
  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  guidelineIds?: string[];

  @ApiProperty({ example: ['123e4567-e89b-12d3-a456-426614174000'], required: false })
  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  rentalTypeIds?: string[];

  @ApiProperty({ example: ['123e4567-e89b-12d3-a456-426614174000'], required: false })
  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  viewTypeIds?: string[];
} 