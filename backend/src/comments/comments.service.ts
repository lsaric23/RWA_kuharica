import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class CommentsService {
  constructor(private readonly redis: RedisService) {}

  private client() {
    return this.redis.getClient();
  }

  async addComment(recipeId: string, userId: string, text: string) {
    const comment = { recipeId, userId, text, createdAt: new Date() };
    await this.client().lpush(`comments:${recipeId}`, JSON.stringify(comment));
    return comment;
  }

  async getComments(recipeId: string) {
    const data = await this.client().lrange(`comments:${recipeId}`, 0, -1);
    return data.map((c: string) => JSON.parse(c));
  }
}