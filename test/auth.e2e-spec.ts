import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { cleanupDatabase } from './test-helpers';
import { v4 as uuidv4 } from 'uuid';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );

    prisma = app.get<PrismaService>(PrismaService);
    await app.init();
  });

  beforeEach(async () => {
    await cleanupDatabase(prisma);
  });

  afterAll(async () => {
    await cleanupDatabase(prisma);
    await app.close();
  });

  describe('/auth/register (POST)', () => {
    const uniqueId = uuidv4().slice(0, 8);
    const registerDto = {
      email: `test.${uniqueId}@example.com`,
      password: 'password123',
      name: 'Test User',
    };

    it('should register a new user', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(201)
        .expect((res) => {
          expect(res.body.user).toBeDefined();
          expect(res.body.user.email).toBe(registerDto.email);
          expect(res.body.user.name).toBe(registerDto.name);
          expect(res.body.user.password).toBeUndefined();
          expect(res.body.token).toBeDefined();
        });
    });

    it('should fail if email is already registered', async () => {
      // First registration
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto);

      // Second registration with same email
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(409);
    });

    it('should fail with invalid data', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'invalid-email',
          password: '123', // too short
        })
        .expect(400);
    });
  });

  describe('/auth/login (POST)', () => {
    const uniqueId = uuidv4().slice(0, 8);
    const userDto = {
      email: `test.${uniqueId}@example.com`,
      password: 'password123',
      name: 'Test User',
    };

    beforeEach(async () => {
      const hashedPassword = await bcrypt.hash(userDto.password, 10);
      await prisma.user.create({
        data: {
          email: userDto.email,
          name: userDto.name,
          password: hashedPassword,
        },
      });
    });

    it('should login successfully with correct credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: userDto.email,
          password: userDto.password,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.user).toBeDefined();
          expect(res.body.user.email).toBe(userDto.email);
          expect(res.body.user.password).toBeUndefined();
          expect(res.body.token).toBeDefined();
        });
    });

    it('should fail with incorrect password', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: userDto.email,
          password: 'wrong-password',
        })
        .expect(401);
    });

    it('should fail with non-existent email', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: userDto.password,
        })
        .expect(401);
    });
  });
}); 