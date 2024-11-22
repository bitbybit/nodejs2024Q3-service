import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this.getToken(request);

    if (token === null) {
      throw new UnauthorizedException('Access token is missing');
    }

    try {
      request.user = this.authService.verifyToken(token);

      return true;
    } catch (error) {
      throw new UnauthorizedException('Access token is invalid');
    }
  }

  private getToken(request: any): string | null {
    const authHeader = request.headers['authorization'];

    if (authHeader === undefined) {
      return null;
    }

    const [type, token] = authHeader.split(' ');

    return type === 'Bearer' && token !== undefined ? token : null;
  }
}
