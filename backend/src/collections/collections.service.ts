import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

interface Collection {
  id: string;
  userId: string;
  name: string;
  recipes: string[];
}

@Injectable()
export class CollectionsService {
  private collections: Collection[] = [];

  createCollection(userId: string, name: string): Collection {
    const newCollection: Collection = {
      id: uuidv4(),
      userId,
      name,
      recipes: [],
    };
    this.collections.push(newCollection);
    return newCollection;
  }

  addRecipe(collectionId: string, recipeId: string, userId: string): Collection | undefined {
    const collection = this.collections.find(
      (c) => c.id === collectionId && c.userId === userId,
    );
    if (collection) {
      collection.recipes.push(recipeId);
    }
    return collection;
  }

  getCollection(id: string): Collection | undefined {
    return this.collections.find((c) => c.id === id);
  }

  getUserCollections(userId: string): Collection[] {
    return this.collections.filter((c) => c.userId === userId);
  }
}