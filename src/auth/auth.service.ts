import { hash, compare } from 'bcrypt';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { type AppConfig } from '../app.module';

import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('APP_CONFIG')
    private readonly appConfig: AppConfig,

    @Inject('ACCESS_TOKEN_SERVICE')
    private readonly accessTokenService: JwtService,

    @Inject('REFRESH_TOKEN_SERVICE')
    private readonly refreshTokenService: JwtService,
  ) {}

  async generateAccessToken(
    login: User['login'],
    userId: User['id'],
  ): Promise<string> {
    return await this.accessTokenService.signAsync({ login, userId });
  }

  async verifyAccessToken(token: string): Promise<object> {
    return await this.accessTokenService.verifyAsync(token);
  }

  async generateRefreshToken(
    login: User['login'],
    userId: User['id'],
  ): Promise<string> {
    return await this.refreshTokenService.signAsync({ login, userId });
  }

  async verifyRefreshToken(token: string): Promise<object> {
    return await this.refreshTokenService.verifyAsync(token);
  }

  async hashPassword(password: string): Promise<string> {
    return await hash(password, this.appConfig.cryptSalt);
  }

  async verifyPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await compare(plainPassword, hashedPassword);
  }
}
