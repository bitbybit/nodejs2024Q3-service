import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { type AppConfig } from '../app.module';

import { AuthGuard } from './auth.guard';

import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: ['APP_CONFIG'],
      useFactory: (appConfig: AppConfig) => ({
        secret: appConfig.jwtSecretKey,
        signOptions: { expiresIn: appConfig.tokenExpireTime },
      }),
    }),
  ],
  providers: [AuthGuard, AuthService],
  exports: [AuthGuard, AuthService],
})
export class AuthModule {}
