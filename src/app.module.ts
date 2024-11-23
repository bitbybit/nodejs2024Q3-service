import { type DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { FavoritesModule } from './favorites/favorites.module';
import { LoginModule } from './login/login.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';

export type AppConfig = {
  cryptSalt: number;
  dataSourceOptions: TypeOrmModuleOptions;
  jwtSecretKey: string;
  tokenExpireTime: string;
};

@Module({})
export class AppModule {
  static forRoot({
    cryptSalt,
    dataSourceOptions,
    jwtSecretKey,
    tokenExpireTime,
  }: AppConfig): DynamicModule {
    return {
      module: AppModule,
      global: true,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: async () => ({
            ...dataSourceOptions,
          }),
        }),

        AlbumModule,
        ArtistModule,
        FavoritesModule,
        LoginModule,
        TrackModule,
        UserModule,
      ],
      providers: [
        {
          provide: 'APP_CONFIG',
          useValue: {
            cryptSalt,
            jwtSecretKey,
            tokenExpireTime,
          },
        },
      ],
      exports: ['APP_CONFIG'],
    };
  }
}
