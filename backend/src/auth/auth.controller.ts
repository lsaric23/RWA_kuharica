import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  async register(@Body() body: { username: string; email: string; password: string }) {
    return this.auth.register(body.username, body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.auth.login(body.username, body.password);
  }
}
