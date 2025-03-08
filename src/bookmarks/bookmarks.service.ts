import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@Injectable()
export class BookmarksService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createBookmarkDto: CreateBookmarkDto) {
    // Check if rooftop exists
    const rooftop = await this.prisma.rooftop.findUnique({
      where: { id: createBookmarkDto.rooftopId },
    });

    if (!rooftop) {
      throw new NotFoundException(`Rooftop with ID ${createBookmarkDto.rooftopId} not found`);
    }

    try {
      // Create bookmark
      const bookmark = await this.prisma.bookmark.create({
        data: {
          user: { connect: { id: userId } },
          rooftop: { connect: { id: createBookmarkDto.rooftopId } },
        },
        include: {
          rooftop: {
            select: {
              id: true,
              title: true,
              description: true,
              city: true,
              capacity: true,
              pricePerHour: true,
              images: true,
            },
          },
        },
      });

      return bookmark;
    } catch (error) {
      // Handle unique constraint violation
      if (error.code === 'P2002') {
        throw new ConflictException('This rooftop is already bookmarked');
      }
      throw error;
    }
  }

  async findAll(userId: string) {
    return this.prisma.bookmark.findMany({
      where: { userId },
      include: {
        rooftop: {
          select: {
            id: true,
            title: true,
            description: true,
            city: true,
            capacity: true,
            pricePerHour: true,
            images: true,
          },
        },
      },
    });
  }

  async remove(userId: string, bookmarkId: string) {
    // Check if bookmark exists and belongs to the user
    const bookmark = await this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId,
      },
    });

    if (!bookmark) {
      throw new NotFoundException(`Bookmark with ID ${bookmarkId} not found or does not belong to the user`);
    }

    // Delete the bookmark
    await this.prisma.bookmark.delete({
      where: { id: bookmarkId },
    });

    return { message: 'Bookmark removed successfully' };
  }

  async removeByRooftopId(userId: string, rooftopId: string) {
    // Check if bookmark exists and belongs to the user
    const bookmark = await this.prisma.bookmark.findFirst({
      where: {
        rooftopId,
        userId,
      },
    });

    if (!bookmark) {
      throw new NotFoundException(`Bookmark for rooftop ID ${rooftopId} not found or does not belong to the user`);
    }

    // Delete the bookmark
    await this.prisma.bookmark.delete({
      where: { id: bookmark.id },
    });

    return { message: 'Bookmark removed successfully' };
  }
} 