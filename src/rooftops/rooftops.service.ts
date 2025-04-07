import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRooftopDto } from './dto/create-rooftop.dto';
import { UpdateRooftopDto } from './dto/update-rooftop.dto';

@Injectable()
export class RooftopsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createRooftopDto: CreateRooftopDto) {
    return this.prisma.rooftop.create({
      data: {
        ...createRooftopDto,
        ownerId: userId,
      },
    });
  }

  async findAll(city?: string, capacity?: number) {
    const where: any = {};

    if (city) {
      where.city = {
        contains: city,
        mode: 'insensitive',
      };
    }

    if (capacity) {
      where.capacity = {
        gte: capacity,
      };
    }

    return this.prisma.rooftop.findMany({
      where,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const rooftop = await this.prisma.rooftop.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true
          },
        },
      },
    });

    if (!rooftop) {
      throw new NotFoundException('Rooftop not found');
    }

    return rooftop;
  }

  async update(id: string, userId: string, updateRooftopDto: UpdateRooftopDto) {
    const rooftop = await this.findOne(id);

    if (rooftop.ownerId !== userId) {
      throw new ForbiddenException('You can only update your own rooftops');
    }

    return this.prisma.rooftop.update({
      where: { id },
      data: updateRooftopDto,
    });
  }

  async remove(id: string, userId: string) {
    const rooftop = await this.findOne(id);

    if (rooftop.ownerId !== userId) {
      throw new ForbiddenException('You can only delete your own rooftops');
    }

    await this.prisma.rooftop.delete({
      where: { id },
    });
  }

  async findNearby(latitude: number, longitude: number, radius: number = 10) {
    // In a real implementation, we would use geospatial queries
    // For now, we'll mock this by returning rooftops in the same city
    // or a random selection of rooftops
    
    // Get all rooftops
    const allRooftops = await this.prisma.rooftop.findMany({
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Mock nearby calculation - in a real app, this would use actual distance calculation
    // For now, just return a random subset of rooftops as "nearby"
    const nearbyRooftops = allRooftops
      .sort(() => 0.5 - Math.random()) // Shuffle array
      .slice(0, 5); // Take first 5 elements

    // Add a mock distance field to each rooftop
    return nearbyRooftops.map(rooftop => ({
      ...rooftop,
      distance: parseFloat((Math.random() * radius).toFixed(1)), // Random distance within radius
    }));
  }

  async findPopular() {
    // In a real implementation, we would sort by number of bookings or ratings
    // For now, we'll mock this by returning a random selection of rooftops
    
    const allRooftops = await this.prisma.rooftop.findMany({
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Mock popular calculation - in a real app, this would use actual booking/rating data
    // For now, just return a random subset of rooftops as "popular"
    const popularRooftops = allRooftops
      .sort(() => 0.5 - Math.random()) // Shuffle array
      .slice(0, 5); // Take first 5 elements

    // Add a mock rating field to each rooftop
    return popularRooftops.map(rooftop => ({
      ...rooftop,
      rating: parseFloat((4 + Math.random()).toFixed(1)), // Random rating between 4.0 and 5.0
      bookingCount: Math.floor(Math.random() * 100) + 50, // Random booking count between 50 and 150
    }));
  }

  async findTrending() {
    // In a real implementation, we would sort by recent bookings or views
    // For now, we'll mock this by returning a random selection of rooftops
    
    const allRooftops = await this.prisma.rooftop.findMany({
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Mock trending calculation - in a real app, this would use actual recent activity data
    // For now, just return a random subset of rooftops as "trending"
    const trendingRooftops = allRooftops
      .sort(() => 0.5 - Math.random()) // Shuffle array
      .slice(0, 5); // Take first 5 elements

    // Add mock trending metrics to each rooftop
    return trendingRooftops.map(rooftop => ({
      ...rooftop,
      recentViews: Math.floor(Math.random() * 1000) + 500, // Random view count between 500 and 1500
      growthRate: parseFloat((Math.random() * 20 + 10).toFixed(1)) + '%', // Random growth rate between 10% and 30%
    }));
  }

  async findRecommended(userId: string) {
    // In a real implementation, we would use user preferences and history
    // For now, we'll mock this by returning a random selection of rooftops
    
    const allRooftops = await this.prisma.rooftop.findMany({
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Mock recommendation algorithm - in a real app, this would use actual user data
    // For now, just return a random subset of rooftops as "recommended"
    const recommendedRooftops = allRooftops
      .sort(() => 0.5 - Math.random()) // Shuffle array
      .slice(0, 5); // Take first 5 elements

    // Add mock recommendation reason to each rooftop
    const reasons = [
      'Based on your previous bookings',
      'Popular in your area',
      'Similar to rooftops you liked',
      'Highly rated by users like you',
      'New listing you might enjoy',
    ];

    return recommendedRooftops.map(rooftop => ({
      ...rooftop,
      recommendationReason: reasons[Math.floor(Math.random() * reasons.length)],
      matchScore: parseFloat((Math.random() * 30 + 70).toFixed(1)) + '%', // Random match score between 70% and 100%
    }));
  }
} 