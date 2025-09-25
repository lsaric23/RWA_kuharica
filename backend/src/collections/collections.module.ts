import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { RedisModule } from '../redis/redis.module';
import { RecipesModule } from '../recipes/recipes.module';

@Module({
  imports: [RedisModule, RecipesModule], 
  controllers: [CollectionsController],
  providers: [CollectionsService],
})
export class CollectionsModule {}