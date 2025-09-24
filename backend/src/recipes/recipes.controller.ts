import { Controller, Get, Param, Post, Body, Req } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipeDto } from 'src/dto/RecipeDto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async findAll(): Promise<RecipeDto[]> {
    const recipes = await this.recipesService.findAll();
    return recipes.map(r => ({
      id: r.id,
      title: r.title,
      description: r.description,
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RecipeDto | null> {
    const recipe = await this.recipesService.findOne(id);
    if (!recipe) return null;
    return {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
    };
  }

  @Post()
  async create(@Req() req: any, @Body() body: { title: string; description: string }): Promise<RecipeDto> {
    const recipe = await this.recipesService.create(body.title, body.description, req.userId);
    return {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
    };
  }
}