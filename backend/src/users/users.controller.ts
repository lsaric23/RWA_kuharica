import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from '../dto/UserDto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserDto[]> {
    const users = await this.usersService.findAll();
    return users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email || '',
    }));
  }
}