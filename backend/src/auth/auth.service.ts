import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { RedisService } from '../redis/redis.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly redis: RedisService) {}

  private client() {
    return this.redis.getClient();
  }

  async register(username: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    await this.client().hmset(`user:${userId}`, {
      username,
      password: hashed,
    });

    return { userId, username };
  }

  async login(username: string, password: string) {
    // Nađi usera u Redis
    const keys = await this.client().keys('user:*');
    let foundUserId: string | null = null;
    let userData: any = null;

    for (const key of keys) {
      const data = await this.client().hgetall(key);
      if (data.username === username) {
        foundUserId = key.split(':')[1];
        userData = data;
        break;
      }
    }

    if (!foundUserId || !userData) {
      throw new UnauthorizedException('User not found');
    }

    // Provjeri password
    const valid = await bcrypt.compare(password, userData.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generiraj JWT
    const token = jwt.sign(
      { userId: foundUserId, username },
      process.env.JWT_SECRET || 'super_secret_key',
      { expiresIn: process.env.JWT_EXPIRES_IN || '3600s' },
    );

    return { access_token: token };
  }

  async validateUser(userId: string) {
    const data = await this.client().hgetall(`user:${userId}`);
    if (!data || !data.username) {
      return null;
    }
    return { userId, username: data.username };
  }
}