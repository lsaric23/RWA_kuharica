import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS') private readonly redisClient: Redis) {}

  async set(key: string, value: any, ttlSeconds?: number): Promise<void> {
    if (ttlSeconds) {
      await this.redisClient.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    } else {
      await this.redisClient.set(key, JSON.stringify(value));
    }
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.redisClient.get(key);
    return value ? (JSON.parse(value) as T) : null;
  }

  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  getClient(): Redis {
    return this.redisClient;
  }
}