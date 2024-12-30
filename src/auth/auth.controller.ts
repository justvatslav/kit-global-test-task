import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginUserDto): Promise<{ access_token: string }> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterUserDto): Promise<{ userId: string }> {
    return this.authService.register(registerDto);
  }

  @Post('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req): any {
    return req.user;
  }
}
