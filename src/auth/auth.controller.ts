import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthService } from './services/google-auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleAuthService: GoogleAuthService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @Post('google')
  async googleAuth(@Body('idToken') idToken: string) {
    try {
      return await this.googleAuthService.validateGoogleToken(idToken);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
} 