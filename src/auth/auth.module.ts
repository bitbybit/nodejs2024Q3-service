import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { type AppConfig } from '../app.module';

import { AccessGuard } from './access.guard';
import { RefreshGuard } from './refresh.guard';

import { AuthService } from './auth.service';

@Module({
  providers: [
    AccessGuard,
    RefreshGuard,
    AuthService,

    {
      provide: 'ACCESS_TOKEN_SERVICE',
      useFactory: (appConfig: AppConfig) =>
        new JwtService({
          secret: appConfig.jwtSecretKey,
          signOptions: { expiresIn: appConfig.tokenExpireTime },
        }),
      inject: ['APP_CONFIG'],
    },

    {
      provide: 'REFRESH_TOKEN_SERVICE',
      useFactory: (appConfig: AppConfig) =>
        new JwtService({
          secret: appConfig.jwtSecretRefreshKey,
          signOptions: { expiresIn: appConfig.tokenRefreshExpireTime },
        }),
      inject: ['APP_CONFIG'],
    },
  ],
  exports: [AccessGuard, RefreshGuard, AuthService],
})
export class AuthModule {}
