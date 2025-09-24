import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  Req,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly svc: RecipesService) {}

  @Get()
  findAll(
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    return this.svc.findAll(Number(page) || 1, Number(pageSize) || 10);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Post()
  create(@Req() req: any, @Body() body: { title: string; description: string }) {
    return this.svc.create(req.userId, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Req() req: any) {
    return this.svc.delete(id, req.userId);
  }
}