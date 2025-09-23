import { Module } from '@nestjs/common';
import { RedisModule } from 'src/redis/redis.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { RecipesModule } from 'src/recipes/recipes.module';
import { UploadModule } from 'src/upload/upload.module';
import { CommentsModule } from 'src/comments/comments.module';
import { CollectionsModule } from 'src/collections/collections.module';

@Module({
  imports: [
    RedisModule,
    AuthModule,
    UsersModule,
    RecipesModule,
    UploadModule,
    CommentsModule,
    CollectionsModule,
  ],
})
export class AppModule {}
