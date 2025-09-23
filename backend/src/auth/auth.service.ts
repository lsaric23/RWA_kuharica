import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private redis: RedisService, private usersService: UsersService) {}

  private client() { return this.redis.getClient(); }

  async register(username: string, email: string, password: string) {
    const user = await this.usersService.create({ username, email, password });
    return { id: user.id, username: user.username, email: user.email };
  }

  async validateUserByUsername(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.passwordHash);
    return ok ? user : null;
  }

  async login(username: string, password: string) {
    const user = await this.validateUserByUsername(username, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const token = uuidv4();
    await this.client().set(`session:${token}`, user.id);
    return { token, user: { id: user.id, username: user.username, email: user.email } };
  }

  async getUserIdByToken(token: string) {
    if (!token) return null;
    return this.client().get(`session:${token}`);
  }
}
