import { Module } from '@nestjs/common';

import { RepositoriesModule } from '../repositories/repositories.module';

import { ArtistService } from './artist.service';

import { ArtistController } from './artist.controller';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [RepositoriesModule],
})
export class ArtistModule {}
