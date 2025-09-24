import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

interface User {
  id: string;
  username: string;
  password: string;
  email?: string;
}

@Injectable()
export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET as string;
  private users: User[] = [];

  async register(username: string, password: string, email?: string): Promise<User> {
    const newUser: User = { id: (this.users.length + 1).toString(), username, password, email };
    this.users.push(newUser);
    return newUser;
  }

  async login(username: string, password: string): Promise<{ token: string }> {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    const token = jwt.sign({ userId: user.id }, this.jwtSecret, { expiresIn: '1h' });
    return { token };
  }

  async validateUser(userId: string): Promise<User | undefined> {
    return this.users.find(u => u.id === userId);
  }

  async getUserIdByToken(token: string): Promise<string> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as { userId: string };
      return decoded.userId;
    } catch {
      throw new Error('Invalid token');
    }
  }
}