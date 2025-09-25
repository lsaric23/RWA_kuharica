import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';

@Module({
  imports: [],
  controllers: [RecipesController],
  providers: [RecipesService],
  exports: [RecipesService], 
})
export class RecipesModule {}