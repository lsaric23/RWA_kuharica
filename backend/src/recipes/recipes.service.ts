import { Injectable } from '@nestjs/common';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  userId: string;
}

@Injectable()
export class RecipesService {
  private recipes: Recipe[] = [];

  async findAll(): Promise<Recipe[]> {
    return this.recipes;
  }


  async findOne(id: string): Promise<Recipe | undefined> {
    return this.recipes.find(r => r.id === id);
  }

  
  async create(title: string, description: string, userId: string): Promise<Recipe> {
    const newRecipe: Recipe = {
      id: (this.recipes.length + 1).toString(),
      title,
      description,
      userId,
    };
    this.recipes.push(newRecipe);
    return newRecipe;
  }
}