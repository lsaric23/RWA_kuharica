import { Module } from '@nestjs/common';
import { CollectionsService } from 'src/collections/collections.service';
import { CollectionsController } from 'src/collections/collections.controller';
import { RedisModule } from '../redis/redis.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [RedisModule, AuthModule],
  providers: [CollectionsService],
  controllers: [CollectionsController],
})
export class CollectionsModule {}
