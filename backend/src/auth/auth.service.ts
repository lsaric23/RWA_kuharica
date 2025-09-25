import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { RedisService } from '../redis/redis.service';
import { UserDto } from '../dto/UserDto';

@Injectable()
export class AuthService {
  private readonly jwtSecret = 'tajna_lozinka';

  constructor(
    private readonly usersService: UsersService,
    private readonly redisService: RedisService,
  ) {}

  async register(username: string, password: string, email?: string): Promise<UserDto> {
    const user = await this.usersService.create(username, password, email);
    return { id: user.id, username: user.username, email: user.email || '' };
  }

  
  async login(username: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.usersService.findByUsername(username);

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Neispravni podaci za prijavu');
    }


    const payload = { userId: user.id, username: user.username };
    const token = jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });

  
    await this.redisService.set(`token:${user.id}`, token, 3600);

    return { accessToken: token };
  }

  
  async validateUser(userId: string): Promise<UserDto | undefined> {
    const user = await this.usersService.findById(userId);
    if (!user) return undefined;

    return { id: user.id, username: user.username, email: user.email || '' };
  }

  async getUserIdByToken(token: string): Promise<string | null> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as { userId: string };
      const cachedToken = await this.redisService.get<string>(`token:${decoded.userId}`);
      if (!cachedToken || cachedToken !== token) {
        return null; 
      }

      return decoded.userId;
    } catch (err) {
      return null;
    }
  }

  async logout(userId: string): Promise<void> {
    await this.redisService.del(`token:${userId}`);
  }
}