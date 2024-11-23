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

    private readonly jwtService: JwtService,
  ) {}

  generateToken(login: User['login'], userId: User['id']): string {
    return this.jwtService.sign({ login, userId });
  }

  verifyToken(token: string): any {
    return this.jwtService.verify(token);
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
