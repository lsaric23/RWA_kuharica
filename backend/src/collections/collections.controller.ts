import { Controller, Post, Body, Param, Req, Get } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionDto } from 'src/dto/CollectionDto';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Post()
  async createCollection(@Req() req: any, @Body() body: { name: string }): Promise<CollectionDto> {
    const collection = await this.collectionsService.createCollection(body.name, req.userId);
    return {
      id: collection.id,
      name: collection.name,
      recipes: collection.recipes || [],
    };
  }

  @Post(':id/recipes')
  async addRecipe(@Param('id') id: string, @Body() body: { recipeId: string }, @Req() req: any): Promise<CollectionDto | null> {
    const collection = await this.collectionsService.addRecipe(id, body.recipeId, req.userId);
    if (!collection) return null;
    return {
      id: collection.id,
      name: collection.name,
      recipes: collection.recipes || [],
    };
  }

  @Get(':id')
  async getCollection(@Param('id') id: string): Promise<CollectionDto | null> {
    const collection = await this.collectionsService.getCollection(id);
    if (!collection) return null;
    return {
      id: collection.id,
      name: collection.name,
      recipes: collection.recipes || [],
    };
  }

  @Get('user')
  async getUserCollections(@Req() req: any): Promise<CollectionDto[]> {
    const collections = await this.collectionsService.getUserCollections(req.userId);
    return collections.map(c => ({
      id: c.id,
      name: c.name,
      recipes: c.recipes || [],
    }));
  }
}