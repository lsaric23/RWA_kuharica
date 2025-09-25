import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService, User } from './users.service';

export class UserDto {
  id: string;
  username: string;
  email?: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserDto[]> {
    const users = await this.usersService.findAll();
    return users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
    }));
  }

  @Post()
  async create(@Body() body: { username: string; password: string; email?: string }): Promise<UserDto> {
    const user = await this.usersService.create(body.username, body.password, body.email);
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }
}