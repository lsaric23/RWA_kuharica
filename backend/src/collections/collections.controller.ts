import {
  Controller,
  Post,
  Param,
  Get,
  Body,
  Req,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly svc: CollectionsService) {}

  @Post()
  createCollection(@Req() req: any, @Body() body: { name: string }) {
    return this.svc.createCollection(req.userId, body.name);
  }

  @Post(':id/recipes/:recipeId')
  addRecipe(
    @Param('id') id: string,
    @Param('recipeId') recipeId: string,
    @Req() req: any,
  ) {
    return this.svc.addRecipe(id, recipeId, req.userId);
  }

  @Get(':id')
  getCollection(@Param('id') id: string) {
    return this.svc.getCollection(id);
  }

  @Get()
  getUserCollections(@Req() req: any) {
    return this.svc.getUserCollections(req.userId);
  }
}