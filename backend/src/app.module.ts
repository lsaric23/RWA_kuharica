import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RecipesModule } from './recipes/recipes.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    RedisModule,
    AuthModule,
    UsersModule,
    RecipesModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
