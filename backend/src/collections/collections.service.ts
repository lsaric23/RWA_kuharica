import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { RecipesService, Recipe } from '../recipes/recipes.service';

export interface Collection {
  id: string;
  name: string;
  userId: string;
  recipes: Recipe[];
}

@Injectable()
export class CollectionsService {
  private collections: Collection[] = [];

  constructor(
    private readonly redis: RedisService,
    private readonly recipesService: RecipesService,
  ) {}

  async createCollection(name: string, userId: string): Promise<Collection> {
    const newCollection: Collection = {
      id: (this.collections.length + 1).toString(),
      name,
      userId,
      recipes: [],
    };
    this.collections.push(newCollection);

    await this.redis.set(`collection:${newCollection.id}`, JSON.stringify(newCollection));

    return newCollection;
  }


  async addRecipe(collectionId: string, recipeId: string, userId: string): Promise<Collection | undefined> {
    const collection = this.collections.find(c => c.id === collectionId && c.userId === userId);
    if (!collection) return undefined;

    const recipe = await this.recipesService.findOne(recipeId);
    if (!recipe) return undefined;

    collection.recipes.push(recipe);

    await this.redis.set(`collection:${collection.id}`, JSON.stringify(collection));

    return collection;
  }

 
  async getCollection(id: string): Promise<Collection | undefined> {
  const cached = await this.redis.get<string>(`collection:${id}`);
  if (cached) {
    return JSON.parse(cached) as Collection;
  }
  return this.collections.find(c => c.id === id);
}

  
  async getUserCollections(userId: string): Promise<Collection[]> {
    return this.collections.filter(c => c.userId === userId);
  }
}