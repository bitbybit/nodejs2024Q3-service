import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { ArtistRepository } from './repositories/artist.repository';
import { AlbumRepository } from './repositories/album.repository';
import { TrackRepository } from './repositories/track.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    AlbumRepository,
    ArtistRepository,
    TrackRepository,
    UserRepository,
  ],
})
export class AppModule {}
