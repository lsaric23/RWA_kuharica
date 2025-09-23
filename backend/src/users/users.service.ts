import { Injectable, ConflictException } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private redis: RedisService) {}
  private client() { return this.redis.getClient(); }

  async create({ username, email, password }: { username: string; email: string; password: string }) {
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
    const u = await this.client().hgetall(`user:${id}`);
    return Object.keys(u).length ? u : null;
  }

  async findByUsername(username: string) {
    const id = await this.client().get(`users:by:username:${username}`);
    return id ? this.findById(id) : null;
  }
}
