import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MetadataService } from './metadata.service';

@ApiTags('Metadata')
@Controller('metadata')
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @Get('activities')
  @ApiOperation({ summary: 'List all rooftop activities' })
  @ApiResponse({ status: 200, description: 'Returns list of activities' })
  listActivities() {
    return this.metadataService.listActivities();
  }

  @Get('privacy')
  @ApiOperation({ summary: 'List all rooftop privacy options' })
  @ApiResponse({ status: 200, description: 'Returns list of privacy options' })
  listPrivacyPolicies() {
    return this.metadataService.listPrivacyPolicies();
  }

  @Get('rental-types')
  @ApiOperation({ summary: 'List all rental types' })
  @ApiResponse({ status: 200, description: 'Returns list of rental types' })
  listRentalTypes() {
    return this.metadataService.listRentalTypes();
  }

  @Get('accessibility')
  @ApiOperation({ summary: 'List all accessibility infrastructure options' })
  @ApiResponse({ status: 200, description: 'Returns list of accessibility infrastructure' })
  listAccessibilityInfra() {
    return this.metadataService.listAccessibilityInfra();
  }

  @Get('features')
  @ApiOperation({ summary: 'List all rooftop features' })
  @ApiResponse({ status: 200, description: 'Returns list of features' })
  listFeatures() {
    return this.metadataService.listFeatures();
  }

  @Get('facilities')
  @ApiOperation({ summary: 'List all rooftop facilities' })
  @ApiResponse({ status: 200, description: 'Returns list of facilities' })
  listFacilities() {
    return this.metadataService.listFacilities();
  }

  @Get('view-types')
  @ApiOperation({ summary: 'List all view types' })
  @ApiResponse({ status: 200, description: 'Returns list of view types' })
  listViewTypes() {
    return this.metadataService.listViewTypes();
  }

  @Get('guidelines')
  @ApiOperation({ summary: 'List all rooftop guidelines' })
  @ApiResponse({ status: 200, description: 'Returns list of guidelines' })
  listGuidelines() {
    return this.metadataService.listGuidelines();
  }

  @Get('cancellation-policies')
  @ApiOperation({ summary: 'List all cancellation policies' })
  @ApiResponse({ status: 200, description: 'Returns list of cancellation policies' })
  listCancellationPolicies() {
    return this.metadataService.listCancellationPolicies();
  }
} 