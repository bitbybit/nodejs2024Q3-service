import { Module } from '@nestjs/common';

import { AlbumRepository } from './album.repository';
import { ArtistRepository } from './artist.repository';
import { TrackRepository } from './track.repository';
import { UserRepository } from './user.repository';
import { FavoritesRepository } from './favorites.repository';

@Module({
  providers: [
    AlbumRepository,
    ArtistRepository,
    TrackRepository,
    UserRepository,
    FavoritesRepository,
  ],
  exports: [
    AlbumRepository,
    ArtistRepository,
    TrackRepository,
    UserRepository,
    FavoritesRepository,
  ],
})
export class RepositoriesModule {}
