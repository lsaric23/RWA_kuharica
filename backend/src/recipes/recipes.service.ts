import { Injectable, NotFoundException } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RecipesService {
  constructor(private redis: RedisService) {}
  private client() { return this.redis.getClient(); }

  async create(userId: string, dto: { title: string; ingredients: any; instructions: string; images?: string[] }) {
    const id = uuidv4();
    const client = this.client();
    await client.hmset(`recipe:${id}`, {
      id,
      title: dto.title,
      authorId: userId,
      ingredients: JSON.stringify(dto.ingredients || []),
      instructions: dto.instructions,
      images: JSON.stringify(dto.images || [])
    });
    const ts = Date.now();
    await client.zadd('recipes:ids', ts.toString(), id);
    return { id, ...dto, authorId: userId };
  }

  async findAll(page = 1, pageSize = 20) {
    const client = this.client();
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;
    const ids = await client.zrevrange('recipes:ids', start, end);
    const result = [];
    for (const id of ids) {
      const r = await client.hgetall(`recipe:${id}`);
      if (Object.keys(r).length) {
        r.ingredients = JSON.parse(r.ingredients || '[]');
        r.images = JSON.parse(r.images || '[]');
        result.push(r);
      }
    }
    return result;
  }

  async findOne(id: string) {
    const r = await this.client().hgetall(`recipe:${id}`);
    if (!r || Object.keys(r).length === 0) throw new NotFoundException('Recipe not found');
    r.ingredients = JSON.parse(r.ingredients || '[]');
    r.images = JSON.parse(r.images || '[]');
    return r;
  }

  async delete(id: string, userId: string) {
    const client = this.client();
    const r = await client.hgetall(`recipe:${id}`);
    if (!r || Object.keys(r).length === 0) throw new NotFoundException('Recipe not found');
    if (r.authorId !== userId) throw new NotFoundException('Only author can delete');
    await client.del(`recipe:${id}`);
    await client.zrem('recipes:ids', id);
    await client.del(`recipe:${id}:comments`);
    return { ok: true };
  }
}
