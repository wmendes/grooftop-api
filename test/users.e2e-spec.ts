import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaService } from '../src/prisma/prisma.service';
import {
  cleanupDatabase,
  createTestUser,
  createTestingApp,
} from './test-helpers';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let testUser: { user: any; token: string };

  beforeAll(async () => {
    const testApp = await createTestingApp();
    app = testApp.app;
    prisma = testApp.prisma;
  });

  beforeEach(async () => {
    await cleanupDatabase(prisma);
    testUser = await createTestUser(prisma, app);
  });

  afterAll(async () => {
    await cleanupDatabase(prisma);
    await app.close();
  });

  describe('/users/me (GET)', () => {
    it('should get current user profile', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/me')
        .set('Authorization', `Bearer ${testUser.token}`)
        .expect(200);

      expect(response.body.id).toBe(testUser.user.id);
      expect(response.body.email).toBe(testUser.user.email);
      expect(response.body.name).toBe(testUser.user.name);
      expect(response.body.password).toBeUndefined();
    });

    it('should fail without authentication', () => {
      return request(app.getHttpServer()).get('/users/me').expect(401);
    });
  });

  describe('/users/me (PATCH)', () => {
    it('should update user profile', async () => {
      const updateData = {
        name: 'Updated Name',
        avatarUrl: 'https://example.com/new-avatar.jpg',
      };

      const response = await request(app.getHttpServer())
        .patch('/users/me')
        .set('Authorization', `Bearer ${testUser.token}`)
        .send(updateData)
        .expect(200);

      expect(response.body.name).toBe(updateData.name);
      expect(response.body.avatarUrl).toBe(updateData.avatarUrl);
      expect(response.body.email).toBe(testUser.user.email);
      expect(response.body.password).toBeUndefined();
    });

    it('should fail with invalid data', () => {
      return request(app.getHttpServer())
        .patch('/users/me')
        .set('Authorization', `Bearer ${testUser.token}`)
        .send({
          avatarUrl: 'not-a-url',
        })
        .expect(400);
    });

    it('should fail without authentication', () => {
      return request(app.getHttpServer())
        .patch('/users/me')
        .send({
          name: 'Updated Name',
        })
        .expect(401);
    });
  });
}); 