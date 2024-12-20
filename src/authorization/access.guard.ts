import { type Request } from 'express';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthorizationService } from './authorization.service';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private readonly authorizationService: AuthorizationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.getToken(request);

    if (token === null) {
      throw new UnauthorizedException('Access token is missing');
    }

    try {
      await this.authorizationService.verifyAccessToken(token);

      return true;
    } catch (error) {
      throw new UnauthorizedException('Access token is invalid');
    }
  }

  private getToken(request: Request): string | null {
    const authHeader = request.headers['authorization'];

    if (authHeader === undefined) {
      return null;
    }

    const [type, token] = authHeader.split(' ');

    return type === 'Bearer' && token !== undefined ? token : null;
  }
}
