import {
  type DynamicModule,
  type MiddlewareConsumer,
  Module,
  type NestModule,
} from '@nestjs/common';
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm';
import { type LogLevel } from '@nestjs/common/services/logger.service';

import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';

import { LogModule } from './log/log.module';
import { LogMiddleware } from './log/log.middleware';

export type AppConfig = {
  cryptSalt: number;
  dataSourceOptions: TypeOrmModuleOptions;
  jwtSecretKey: string;
  jwtSecretRefreshKey: string;
  logDir: string;
  logFileSizeKb: number;
  logFilename: string;
  logErrorFilename: string;
  logLevel: LogLevel;
  tokenExpireTime: string;
  tokenRefreshExpireTime: string;
};

@Module({})
export class AppModule implements NestModule {
  static forRoot(appConfig: AppConfig): DynamicModule {
    return {
      module: AppModule,
      global: true,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: async () => ({
            ...appConfig.dataSourceOptions,
          }),
        }),

        AlbumModule,
        ArtistModule,
        FavoritesModule,
        AuthenticationModule,
        TrackModule,
        UserModule,

        LogModule,
      ],
      providers: [
        {
          provide: 'APP_CONFIG',
          useValue: {
            ...appConfig,
          },
        },
      ],
      exports: ['APP_CONFIG'],
    };
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}
