import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

const GOOGLE_CLIENT_ID = '687778051077-d2rt3ihaln8cv9tg54ighkkqko6m9e6m.apps.googleusercontent.com';

@Injectable()
export class GoogleAuthService {
  private googleClient: OAuth2Client;

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {
    this.googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);
  }

  async validateGoogleToken(idToken: string) {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience: GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) {
        throw new Error('No payload in Google token');
      }

      const { email, name } = payload;
      if (!email) {
        throw new Error('No email in Google token payload');
      }

      // Find or create user
      let user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        // Create new user
        user = await this.prisma.user.create({
          data: {
            email,
            name: name || email.split('@')[0],
            // Generate a random password for Google users
            password: Math.random().toString(36).slice(-8),
          },
        });
      }

      // Generate JWT token
      const token = this.jwtService.sign({
        sub: user.id,
        email: user.email,
      });

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatarUrl: user.avatarUrl,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      };
    } catch (error) {
      console.error('Google token validation failed:', error);
      throw new Error('Invalid Google token');
    }
  }
} 