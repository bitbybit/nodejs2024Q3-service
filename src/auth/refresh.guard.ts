import { type Request } from 'express';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.getToken(request);

    if (token === null) {
      throw new UnauthorizedException('Refresh token is missing');
    }

    try {
      await this.authService.verifyRefreshToken(token);

      return true;
    } catch (error) {
      throw new ForbiddenException('Refresh token is invalid or expired');
    }
  }

  private getToken(request: Request): string | null {
    const { refreshToken } = request.body;

    if (refreshToken === undefined) {
      return null;
    }

    return refreshToken;
  }
}
