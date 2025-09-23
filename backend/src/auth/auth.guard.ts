import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers['authorization'] || '';
    const parts = String(auth).split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') throw new UnauthorizedException('Invalid token format');
    const token = parts[1];
    const userId = await this.auth.getUserIdByToken(token);
    if (!userId) throw new UnauthorizedException('Invalid token');
    req.userId = userId;
    return true;
  }
}
