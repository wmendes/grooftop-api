import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from './bookings.service';
import { PrismaService } from '../prisma/prisma.service';

describe('BookingsService', () => {
  let service: BookingsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    booking: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a booking', async () => {
      const mockBooking = {
        id: '1',
        userId: 'user1',
        rooftopId: 'rooftop1',
        startTime: new Date(),
        endTime: new Date(),
      };

      mockPrismaService.booking.create.mockResolvedValue(mockBooking);

      const result = await service.create('user1', {
        rooftopId: 'rooftop1',
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
      });

      expect(result).toEqual(mockBooking);
      expect(prisma.booking.create).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all bookings for a user', async () => {
      const mockBookings = [
        {
          id: '1',
          userId: 'user1',
          rooftopId: 'rooftop1',
        },
      ];

      mockPrismaService.booking.findMany.mockResolvedValue(mockBookings);

      const result = await service.findAll('user1');
      expect(result).toEqual(mockBookings);
      expect(prisma.booking.findMany).toHaveBeenCalledWith({
        where: { userId: 'user1' },
      });
    });

    it('should filter by rooftopId if provided', async () => {
      await service.findAll('user1', 'rooftop1');
      expect(prisma.booking.findMany).toHaveBeenCalledWith({
        where: { userId: 'user1', rooftopId: 'rooftop1' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a booking by id', async () => {
      const mockBooking = {
        id: '1',
        userId: 'user1',
        rooftopId: 'rooftop1',
      };

      mockPrismaService.booking.findFirst.mockResolvedValue(mockBooking);

      const result = await service.findOne('1', 'user1');
      expect(result).toEqual(mockBooking);
      expect(prisma.booking.findFirst).toHaveBeenCalledWith({
        where: { id: '1', userId: 'user1' },
      });
    });
  });

  describe('update', () => {
    it('should update a booking', async () => {
      const mockBooking = {
        id: '1',
        userId: 'user1',
        rooftopId: 'rooftop1',
        startTime: new Date(),
      };

      mockPrismaService.booking.update.mockResolvedValue(mockBooking);

      const result = await service.update('1', 'user1', { startTime: new Date().toISOString() });
      expect(result).toEqual(mockBooking);
      expect(prisma.booking.update).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should delete a booking', async () => {
      const mockBooking = {
        id: '1',
        userId: 'user1',
        rooftopId: 'rooftop1',
      };

      mockPrismaService.booking.delete.mockResolvedValue(mockBooking);

      const result = await service.remove('1', 'user1');
      expect(result).toEqual(mockBooking);
      expect(prisma.booking.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });
}); 