import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingStatus } from './types/booking-status.enum';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createBookingDto: CreateBookingDto) {
    // Validate rooftop exists
    const rooftop = await this.prisma.rooftop.findUnique({
      where: { id: createBookingDto.rooftopId },
    });

    if (!rooftop) {
      throw new NotFoundException('Rooftop not found');
    }

    // Validate booking dates
    const startTime = new Date(createBookingDto.startTime);
    const endTime = new Date(createBookingDto.endTime);

    if (startTime >= endTime) {
      throw new BadRequestException('End time must be after start time');
    }

    if (startTime <= new Date()) {
      throw new BadRequestException('Start time must be in the future');
    }

    // Check for overlapping bookings
    const overlappingBooking = await this.prisma.booking.findFirst({
      where: {
        rooftopId: createBookingDto.rooftopId,
        status: BookingStatus.CONFIRMED,
        OR: [
          {
            AND: [
              { startTime: { lte: startTime } },
              { endTime: { gt: startTime } },
            ],
          },
          {
            AND: [
              { startTime: { lt: endTime } },
              { endTime: { gte: endTime } },
            ],
          },
        ],
      },
    });

    if (overlappingBooking) {
      throw new BadRequestException('This time slot is already booked');
    }

    // Calculate total price
    const hours = Math.ceil((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60));
    const totalPrice = hours * rooftop.pricePerHour;

    // Create booking
    const booking = await this.prisma.booking.create({
      data: {
        startTime,
        endTime,
        totalPrice,
        status: BookingStatus.PENDING,
        userId,
        rooftopId: createBookingDto.rooftopId,
      },
      include: {
        rooftop: {
          select: {
            title: true,
            city: true,
            pricePerHour: true,
            owner: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return booking;
  }

  async findAll(userId: string, rooftopId?: string) {
    const where: any = { userId };

    if (rooftopId) {
      where.rooftopId = rooftopId;
    }

    return this.prisma.booking.findMany({
      where,
      include: {
        rooftop: {
          select: {
            title: true,
            city: true,
            pricePerHour: true,
            images: true,
            owner: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        startTime: 'desc',
      },
    });
  }

  async findOne(id: string, userId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        rooftop: {
          select: {
            title: true,
            city: true,
            pricePerHour: true,
            owner: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.userId !== userId && booking.rooftop.owner.id !== userId) {
      throw new ForbiddenException('You can only view your own bookings');
    }

    return booking;
  }

  async update(id: string, userId: string, updateBookingDto: UpdateBookingDto) {
    const booking = await this.findOne(id, userId);

    // Only allow updates to pending bookings
    if (booking.status !== BookingStatus.PENDING) {
      throw new BadRequestException('Can only update pending bookings');
    }

    // If updating dates, validate them
    if (updateBookingDto.startTime || updateBookingDto.endTime) {
      const startTime = new Date(updateBookingDto.startTime || booking.startTime);
      const endTime = new Date(updateBookingDto.endTime || booking.endTime);

      if (startTime >= endTime) {
        throw new BadRequestException('End time must be after start time');
      }

      if (startTime <= new Date()) {
        throw new BadRequestException('Start time must be in the future');
      }

      // Check for overlapping bookings
      const overlappingBooking = await this.prisma.booking.findFirst({
        where: {
          id: { not: id },
          rooftopId: booking.rooftopId,
          status: BookingStatus.CONFIRMED,
          OR: [
            {
              AND: [
                { startTime: { lte: startTime } },
                { endTime: { gt: startTime } },
              ],
            },
            {
              AND: [
                { startTime: { lt: endTime } },
                { endTime: { gte: endTime } },
              ],
            },
          ],
        },
      });

      if (overlappingBooking) {
        throw new BadRequestException('This time slot is already booked');
      }

      // Recalculate total price if dates changed
      const hours = Math.ceil((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60));
      updateBookingDto['totalPrice'] = hours * booking.rooftop.pricePerHour;
    }

    return this.prisma.booking.update({
      where: { id },
      data: updateBookingDto,
      include: {
        rooftop: {
          select: {
            title: true,
            city: true,
            pricePerHour: true,
            owner: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
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
    const booking = await this.findOne(id, userId);

    if (booking.status === BookingStatus.CONFIRMED) {
      throw new BadRequestException('Cannot delete confirmed bookings');
    }

    await this.prisma.booking.delete({
      where: { id },
    });
  }
} 