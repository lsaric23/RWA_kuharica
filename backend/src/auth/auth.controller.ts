import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../dto/UserDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string; email?: string }): Promise<UserDto> {
    const user = await this.authService.register(body.username, body.password, body.email);
    return { id: user.id, username: user.username, email: user.email };
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body.username, body.password);
  }

  @Post('validate')
  async validate(@Req() req: any): Promise<UserDto | undefined> {
    const user = await this.authService.validateUser(req.userId);
    if (!user) return undefined;
    return { id: user.id, username: user.username, email: user.email };
  }
}