import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RecipesModule } from './recipes/recipes.module';
import { CollectionsModule } from './collections/collections.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { RedisModule } from './redis/redis.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    UsersModule,
    RecipesModule,
    CollectionsModule,
    AuthModule,
    UploadModule,
    RedisModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}