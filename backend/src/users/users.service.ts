import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export interface User {
  id: string;
  username: string;
  password: string;
  email?: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [];

  async create(username: string, password: string, email?: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: (this.users.length + 1).toString(),
      username,
      password: hashedPassword,
      email,
    };

    this.users.push(newUser);
    return newUser;
  }

  
  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  
  async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    return this.users.map(({ password, ...rest }) => rest);
  }
}