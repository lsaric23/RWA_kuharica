import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RecipesModule } from './recipes/recipes.module';
import { CollectionsModule } from './collections/collections.module';
import { UploadController } from './upload/upload.controller';

@Module({
  imports: [AuthModule, UsersModule, RecipesModule, CollectionsModule],
  controllers: [UploadController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();