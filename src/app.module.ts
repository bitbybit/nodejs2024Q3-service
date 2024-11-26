import { type DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';

export type AppConfig = {
  dataSourceOptions: TypeOrmModuleOptions;
};

@Module({})
export class AppModule {
  static forRoot({ dataSourceOptions }: AppConfig): DynamicModule {
    return {
      module: AppModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: async () => ({
            ...dataSourceOptions,
          }),
        }),

        AlbumModule,
        ArtistModule,
        FavoritesModule,
        TrackModule,
        UserModule,
      ],
    };
  }
}
