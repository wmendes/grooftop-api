import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MetadataService {
  constructor(private readonly prisma: PrismaService) {}

  async listActivities() {
    return this.prisma.rooftopActivity.findMany();
  }

  async listPrivacyPolicies() {
    return this.prisma.privacyPolicy.findMany();
  }

  async listRentalTypes() {
    return this.prisma.rentalType.findMany();
  }

  async listAccessibilityInfra() {
    return this.prisma.accessibilityInfra.findMany();
  }

  async listFeatures() {
    return this.prisma.rooftopFeature.findMany();
  }

  async listFacilities() {
    return this.prisma.rooftopFacility.findMany();
  }

  async listViewTypes() {
    return this.prisma.rooftopViewType.findMany();
  }

  async listGuidelines() {
    return this.prisma.rooftopGuideline.findMany();
  }

  async listCancellationPolicies() {
    return this.prisma.cancellationPolicy.findMany();
  }

  async listExperienceTypes() {
    return this.prisma.rooftopExperienceType.findMany();
  }
} 