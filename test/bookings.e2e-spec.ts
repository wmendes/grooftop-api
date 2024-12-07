import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaService } from '../src/prisma/prisma.service';
import {
  cleanupDatabase,
  createTestUser,
  createTestRooftop,
  createTestBooking,
  createTestingApp,
} from './test-helpers';

describe('BookingsController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let testUser: { user: any; token: string };
  let testRooftop: any;

  beforeAll(async () => {
    const testApp = await createTestingApp();
    app = testApp.app;
    prisma = testApp.prisma;
  });

  beforeEach(async () => {
    await cleanupDatabase(prisma);
    testUser = await createTestUser(prisma, app);
    testRooftop = await createTestRooftop(prisma, app, testUser.token);
  });

  afterAll(async () => {
    await cleanupDatabase(prisma);
    await app.close();
  });

  describe('/bookings (POST)', () => {
    it('should create a booking', async () => {
      const bookingData = {
        rooftopId: testRooftop.id,
        startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        endTime: new Date(Date.now() + 28 * 60 * 60 * 1000).toISOString(),
      };

      const response = await request(app.getHttpServer())
        .post('/bookings')
        .set('Authorization', `Bearer ${testUser.token}`)
        .send(bookingData)
        .expect(201);

      expect(response.body.rooftopId).toBe(testRooftop.id);
      expect(response.body.userId).toBe(testUser.user.id);
    });

    it('should fail without authentication', () => {
      return request(app.getHttpServer())
        .post('/bookings')
        .send({})
        .expect(401);
    });
  });

  describe('/bookings (GET)', () => {
    it('should get user bookings', async () => {
      const booking = await createTestBooking(
        prisma,
        app,
        testUser.token,
        testRooftop.id,
      );

      const response = await request(app.getHttpServer())
        .get('/bookings')
        .set('Authorization', `Bearer ${testUser.token}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0].id).toBe(booking.id);
    });

    it('should filter by rooftopId', async () => {
      await createTestBooking(prisma, app, testUser.token, testRooftop.id);

      const response = await request(app.getHttpServer())
        .get(`/bookings?rooftopId=${testRooftop.id}`)
        .set('Authorization', `Bearer ${testUser.token}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0].rooftopId).toBe(testRooftop.id);
    });
  });

  describe('/bookings/:id (GET)', () => {
    it('should get a booking by id', async () => {
      const booking = await createTestBooking(
        prisma,
        app,
        testUser.token,
        testRooftop.id,
      );

      const response = await request(app.getHttpServer())
        .get(`/bookings/${booking.id}`)
        .set('Authorization', `Bearer ${testUser.token}`)
        .expect(200);

      expect(response.body.id).toBe(booking.id);
    });
  });

  describe('/bookings/:id (PATCH)', () => {
    it('should update a booking', async () => {
      const booking = await createTestBooking(
        prisma,
        app,
        testUser.token,
        testRooftop.id,
      );

      const updateData = {
        startTime: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      };

      const response = await request(app.getHttpServer())
        .patch(`/bookings/${booking.id}`)
        .set('Authorization', `Bearer ${testUser.token}`)
        .send(updateData)
        .expect(200);

      expect(new Date(response.body.startTime)).toEqual(new Date(updateData.startTime));
    });
  });

  describe('/bookings/:id (DELETE)', () => {
    it('should delete a booking', async () => {
      const booking = await createTestBooking(
        prisma,
        app,
        testUser.token,
        testRooftop.id,
      );

      await request(app.getHttpServer())
        .delete(`/bookings/${booking.id}`)
        .set('Authorization', `Bearer ${testUser.token}`)
        .expect(200);

      const deletedBooking = await prisma.booking.findUnique({
        where: { id: booking.id },
      });
      expect(deletedBooking).toBeNull();
    });
  });
}); 