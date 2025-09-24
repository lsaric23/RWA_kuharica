import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class RedisService {
  private client: Redis;

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: Number(process.env.REDIS_PORT) || 6379,
    });
  }

  getClient() {
    return this.client;
  }

  async set(key: string, value: string) {
    await this.client.set(key, value);
  }

  async get(key: string) {
    return this.client.get(key);
  }
}