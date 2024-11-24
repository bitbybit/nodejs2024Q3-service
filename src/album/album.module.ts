import { Module } from '@nestjs/common';

import { AuthorizationModule } from '../authorization/authorization.module';
import { RepositoriesModule } from '../repositories/repositories.module';

import { AlbumService } from './album.service';

import { AlbumController } from './album.controller';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [AuthorizationModule, RepositoriesModule],
})
export class AlbumModule {}
