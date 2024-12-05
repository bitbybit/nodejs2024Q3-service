import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AuthorizationModule } from '../authorization/authorization.module';

import { Album } from '../entities/album.entity';
import { Artist } from '../entities/artist.entity';
import { Favorites } from '../entities/favorites.entity';
import { Track } from '../entities/track.entity';
import { User } from '../entities/user.entity';

import { AlbumRepository } from './album.repository';
import { ArtistRepository } from './artist.repository';
import { FavoritesRepository } from './favorites.repository';
import { TrackRepository } from './track.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    AuthorizationModule,
    TypeOrmModule.forFeature([Album, Artist, Favorites, Track, User]),
  ],

  providers: [
    AlbumRepository,
    ArtistRepository,
    FavoritesRepository,
    TrackRepository,
    UserRepository,
  ],

  exports: [
    AlbumRepository,
    ArtistRepository,
    FavoritesRepository,
    TrackRepository,
    UserRepository,
  ],
})
export class RepositoriesModule {}
