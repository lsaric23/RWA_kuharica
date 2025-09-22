import { Injectable, ConflictException } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private redis: RedisService) {}

  private client() { return this.redis.getClient(); }

  async create({ username, email, password }: { username: string; email: string; password: string }) {
    // check index users:by:username
    const client = this.client();
    const existing = await client.get(`users:by:username:${username}`);
    if (existing) throw new ConflictException('Username already exists');
    const id = uuidv4();
    const passwordHash = await bcrypt.hash(password, 10);
    await client.hmset(`user:${id}`, { id, username, email, passwordHash });
    await client.sadd('users:ids', id);
    await client.set(`users:by:username:${username}`, id);
    return { id, username, email, passwordHash };
  }

  async findById(id: string) {
    const client = this.client();
    const u = await client.hgetall(`user:${id}`);
    if (!u || Object.keys(u).length === 0) return null;
    return u;
  }

  async findByUsername(username: string) {
    const client = this.client();
    const id = await client.get(`users:by:username:${username}`);
    if (!id) return null;
    return this.findById(id);
  }
}
