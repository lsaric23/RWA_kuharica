import { Injectable, NotFoundException } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CommentsService {
  constructor(private redis: RedisService) {}
  private client() { return this.redis.getClient(); }

  async addComment(recipeId: string, userId: string, text: string) {
    const recipe = await this.client().hgetall(`recipe:${recipeId}`);
    if (!recipe || Object.keys(recipe).length === 0) throw new NotFoundException('Recipe not found');
    const id = uuidv4();
    const comment = { id, recipeId, authorId: userId, text, createdAt: Date.now() };
    await this.client().rpush(`recipe:${recipeId}:comments`, JSON.stringify(comment));
    return comment;
  }

  async getComments(recipeId: string) {
    const list = await this.client().lrange(`recipe:${recipeId}:comments`, 0, -1);
    return list.map((item) => JSON.parse(item));
  }
}
