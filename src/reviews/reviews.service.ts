import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { BookingStatus } from '../bookings/types/booking-status.enum';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createReviewDto: CreateReviewDto) {
    // Check if rooftop exists
    const rooftop = await this.prisma.rooftop.findUnique({
      where: { id: createReviewDto.rooftopId },
    });

    if (!rooftop) {
      throw new NotFoundException('Rooftop not found');
    }

    // Check if user has a confirmed booking for this rooftop
    const hasBooking = await this.prisma.booking.findFirst({
      where: {
        userId,
        rooftopId: createReviewDto.rooftopId,
        status: BookingStatus.CONFIRMED,
        endTime: {
          lt: new Date(),
        },
      },
    });

    if (!hasBooking) {
      throw new BadRequestException(
        'You can only review rooftops after a confirmed booking',
      );
    }

    // Check if user has already reviewed this rooftop
    const existingReview = await this.prisma.review.findFirst({
      where: {
        userId,
        rooftopId: createReviewDto.rooftopId,
      },
    });

    if (existingReview) {
      throw new BadRequestException('You have already reviewed this rooftop');
    }

    // Create review
    const review = await this.prisma.review.create({
      data: {
        ...createReviewDto,
        userId,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return review;
  }

  async findAllByRooftop(rooftopId: string) {
    // Check if rooftop exists
    const rooftop = await this.prisma.rooftop.findUnique({
      where: { id: rooftopId },
    });

    if (!rooftop) {
      throw new NotFoundException('Rooftop not found');
    }

    return this.prisma.review.findMany({
      where: { rooftopId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const review = await this.prisma.review.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  async update(id: string, userId: string, updateReviewDto: UpdateReviewDto) {
    const review = await this.findOne(id);

    if (review.userId !== userId) {
      throw new ForbiddenException('You can only update your own reviews');
    }

    return this.prisma.review.update({
      where: { id },
      data: updateReviewDto,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async remove(id: string, userId: string) {
    const review = await this.findOne(id);

    if (review.userId !== userId) {
      throw new ForbiddenException('You can only delete your own reviews');
    }

    await this.prisma.review.delete({
      where: { id },
    });
  }
} 