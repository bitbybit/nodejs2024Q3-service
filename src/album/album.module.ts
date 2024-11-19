import { Module } from '@nestjs/common';

import { RepositoriesModule } from '../repositories/repositories.module';

import { AlbumService } from './album.service';

import { AlbumController } from './album.controller';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [RepositoriesModule],
})
export class AlbumModule {}
