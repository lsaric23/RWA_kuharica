import { Controller, Get, Query, Param, Post, Body, UseGuards, Req, Delete } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('recipes')
export class RecipesController {
  constructor(private svc: RecipesService) {}

  @Get()
  getAll(@Query('page') page = '1', @Query('pageSize') pageSize = '20') {
    return this.svc.findAll(Number(page), Number(pageSize));
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Req() req, @Body() body: { title: string; ingredients: any; instructions: string; images?: string[] }) {
    return this.svc.create(req.userId, body);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Req() req, @Param('id') id: string) {
    return this.svc.delete(id, req.userId);
  }
}
