import { Module } from '@nestjs/common';

import { RepositoriesModule } from '../repositories/repositories.module';

import { TrackService } from './track.service';

import { TrackController } from './track.controller';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [RepositoriesModule],
})
export class TrackModule {}
