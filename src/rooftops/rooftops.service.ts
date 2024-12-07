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
} 