import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

interface Recipe {
  id: string;
  userId: string;
  title: string;
  description: string;
}

@Injectable()
export class RecipesService {
  private recipes: Recipe[] = [];

  findAll(page: number = 1, pageSize: number = 10): Recipe[] {
    const start = (page - 1) * pageSize;
    return this.recipes.slice(start, start + pageSize);
  }

  findOne(id: string): Recipe | undefined {
    return this.recipes.find((r) => r.id === id);
  }

  create(userId: string, recipeData: { title: string; description: string }): Recipe {
    const newRecipe: Recipe = {
      id: uuidv4(),
      userId,
      ...recipeData,
    };
    this.recipes.push(newRecipe);
    return newRecipe;
  }

  delete(id: string, userId: string): boolean {
    const index = this.recipes.findIndex(
      (r) => r.id === id && r.userId === userId,
    );
    if (index !== -1) {
      this.recipes.splice(index, 1);
      return true;
    }
    return false;
  }
}