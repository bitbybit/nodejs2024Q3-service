import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { RepositoriesModule } from '../repositories/repositories.module';

import { ArtistService } from './artist.service';

import { ArtistController } from './artist.controller';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [AuthModule, RepositoriesModule],
})
export class ArtistModule {}
