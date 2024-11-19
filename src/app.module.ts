import { Module } from '@nestjs/common';

import { AlbumRepository } from './repositories/album.repository';
import { AlbumService } from './services/album.service';
import { AlbumController } from './controllers/album.controller';

import { ArtistRepository } from './repositories/artist.repository';
import { ArtistService } from './services/artist.service';
import { ArtistController } from './controllers/artist.controller';

import { TrackRepository } from './repositories/track.repository';
import { TrackService } from './services/track.service';
import { TrackController } from './controllers/track.controller';

import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

import { FavoritesRepository } from './repositories/favorites.repository';
import { FavoritesService } from './services/favorites.service';
import { FavoritesController } from './controllers/favorites.controller';

@Module({
  imports: [],
  controllers: [
    AlbumController,
    ArtistController,
    TrackController,
    UserController,
    FavoritesController,
  ],
  providers: [
    AlbumService,
    ArtistService,
    TrackService,
    UserService,
    FavoritesService,
    AlbumRepository,
    ArtistRepository,
    TrackRepository,
    UserRepository,
    FavoritesRepository,
  ],
})
export class AppModule {}
