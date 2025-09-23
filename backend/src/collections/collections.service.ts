import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CollectionsService {
  constructor(private redis: RedisService) {}
  private client() { return this.redis.getClient(); }

  async createCollection(userId: string, name: string) {
    const id = uuidv4();
    await this.client().hmset(`collection:${id}`, { id, name, ownerId: userId });
    await this.client().sadd(`user:${userId}:collections`, id);
    return { id, name, ownerId: userId };
  }

  async addRecipe(collectionId: string, recipeId: string, userId: string) {
    const col = await this.client().hgetall(`collection:${collectionId}`);
    if (!col || Object.keys(col).length === 0) throw new NotFoundException('Collection not found');
    if (col.ownerId !== userId) throw new ForbiddenException('Not your collection');

    const recipe = await this.client().hgetall(`recipe:${recipeId}`);
    if (!recipe || Object.keys(recipe).length === 0) throw new NotFoundException('Recipe not found');

    await this.client().sadd(`collection:${collectionId}:recipes`, recipeId);
    return { collectionId, recipeId };
  }

  async getCollection(collectionId: string) {
    const col = await this.client().hgetall(`collection:${collectionId}`);
    if (!col || Object.keys(col).length === 0) throw new NotFoundException('Collection not found');
    const recipeIds = await this.client().smembers(`collection:${collectionId}:recipes`);
    return { ...col, recipes: recipeIds };
  }

  async getUserCollections(userId: string) {
    const ids = await this.client().smembers(`user:${userId}:collections`);
    const result = [];
    for (const id of ids) {
      const c = await this.client().hgetall(`collection:${id}`);
      if (Object.keys(c).length) result.push(c);
    }
    return result;
  }
}
