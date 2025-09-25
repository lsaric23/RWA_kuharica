import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { CollectionsService, Collection } from './collections.service';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Post()
  async createCollection(@Req() req: any, @Body() body: { name: string }) {
    const collection = await this.collectionsService.createCollection(body.name, req.userId);
    return {
      id: collection.id,
      name: collection.name,
      recipes: collection.recipes,
    };
  }

  @Post(':id/add')
  async addRecipe(@Param('id') id: string, @Req() req: any, @Body() body: { recipeId: string }) {
    const collection = await this.collectionsService.addRecipe(id, body.recipeId, req.userId);
    if (!collection) return undefined;

    return {
      id: collection.id,
      name: collection.name,
      recipes: collection.recipes,
    };
  }

  @Get(':id')
  async getCollection(@Param('id') id: string) {
    const collection = await this.collectionsService.getCollection(id);
    if (!collection) return undefined;

    return {
      id: collection.id,
      name: collection.name,
      recipes: collection.recipes,
    };
  }

  @Get('my')
  async getUserCollections(@Req() req: any) {
    const collections = await this.collectionsService.getUserCollections(req.userId);
    return collections.map(c => ({
      id: c.id,
      name: c.name,
      recipes: c.recipes,
    }));
  }
}