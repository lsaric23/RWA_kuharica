import { Controller, Post, Get, Param, Body, UseGuards, Req } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('collections')
export class CollectionsController {
  constructor(private svc: CollectionsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Req() req, @Body() body: { name: string }) {
    return this.svc.createCollection(req.userId, body.name);
  }

  @UseGuards(AuthGuard)
  @Post(':id/add-recipe/:recipeId')
  addRecipe(@Req() req, @Param('id') id: string, @Param('recipeId') recipeId: string) {
    return this.svc.addRecipe(id, recipeId, req.userId);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.svc.getCollection(id);
  }

  @UseGuards(AuthGuard)
  @Get('user/my')
  getMine(@Req() req) {
    return this.svc.getUserCollections(req.userId);
  }
}
