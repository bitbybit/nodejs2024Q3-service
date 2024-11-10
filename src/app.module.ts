import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { ArtistRepository } from './repositories/artist.repository';
import { AlbumRepository } from './repositories/album.repository';
import { TrackRepository } from './repositories/track.repository';
import { TrackController } from './controllers/track.controller';
import { TrackService } from './services/track.service';
import { ArtistService } from './services/artist.service';
import { ArtistController } from './controllers/artist.controller';
import { AlbumService } from './services/album.service';
import { AlbumController } from './controllers/album.controller';

@Module({
  imports: [],
  controllers: [
    AlbumController,
    ArtistController,
    TrackController,
    UserController,
  ],
  providers: [
    AlbumService,
    ArtistService,
    TrackService,
    UserService,
    AlbumRepository,
    ArtistRepository,
    TrackRepository,
    UserRepository,
  ],
})
export class AppModule {}
