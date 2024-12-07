import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

export async function createTestingApp(): Promise<{
  app: INestApplication;
  prisma: PrismaService;
}> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const prisma = app.get<PrismaService>(PrismaService);
  await app.init();

  return { app, prisma };
}

export async function cleanupDatabase(prisma: PrismaService) {
  try {
    // Use transaction to ensure atomic cleanup
    await prisma.$transaction(async (tx) => {
      // Delete in correct order to respect foreign key constraints
      await tx.review.deleteMany();
      await tx.booking.deleteMany();
      await tx.rooftop.deleteMany();
      await tx.user.deleteMany();
    });
  } catch (error) {
    console.error('Error cleaning up database:', error);
    throw error;
  }
}

export async function createTestUser(
  prisma: PrismaService,
  app: INestApplication,
  userData?: {
    email?: string;
    password?: string;
    name?: string;
  },
) {
  const uniqueId = uuidv4().slice(0, 8);
  const defaultData = {
    email: `test.${uniqueId}@example.com`,
    password: 'password123',
    name: 'Test User',
  };

  const testUserData = { ...defaultData, ...userData };

  try {
    // Register user through the API
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(testUserData);

    if (!response.body.token) {
      throw new Error('Failed to get authentication token during user creation');
    }

    return {
      user: response.body.user,
      token: response.body.token,
    };
  } catch (error) {
    console.error('Error creating test user:', error);
    throw error;
  }
}

export async function createTestRooftop(
  prisma: PrismaService,
  app: INestApplication,
  token: string,
  rooftopData = {
    title: 'Test Rooftop',
    description: 'A test rooftop',
    city: 'Test City',
    capacity: 20,
    pricePerHour: 50,
    images: ['https://example.com/image.jpg'],
  },
) {
  const response = await request(app.getHttpServer())
    .post('/rooftops')
    .set('Authorization', `Bearer ${token}`)
    .send(rooftopData);

  return response.body;
}

export async function createTestBooking(
  prisma: PrismaService,
  app: INestApplication,
  token: string,
  rooftopId: string,
  bookingData = {
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // tomorrow
    endTime: new Date(Date.now() + 28 * 60 * 60 * 1000).toISOString(), // tomorrow + 4 hours
  },
) {
  const response = await request(app.getHttpServer())
    .post('/bookings')
    .set('Authorization', `Bearer ${token}`)
    .send({
      rooftopId,
      ...bookingData,
    });

  return response.body;
} 