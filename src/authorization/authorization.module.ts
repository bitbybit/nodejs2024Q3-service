import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { type AppConfig } from '../app.module';

import { AccessGuard } from './access.guard';
import { RefreshGuard } from './refresh.guard';

import { AuthorizationService } from './authorization.service';

@Module({
  providers: [
    AccessGuard,
    RefreshGuard,
    AuthorizationService,

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
  exports: [AccessGuard, RefreshGuard, AuthorizationService],
})
export class AuthorizationModule {}
