import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { RedisModule } from '../redis/redis.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule, RedisModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService], 
})
export class AuthModule {}