import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [];

  async createUser(username: string, password: string): Promise<User> {
    const user: User = {
      id: uuidv4(),
      username,
      password, 
    };
    this.users.push(user);
    return user;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find((u) => u.username === username);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((u) => u.id === id);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }
}