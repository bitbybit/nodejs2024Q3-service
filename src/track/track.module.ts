import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { RepositoriesModule } from '../repositories/repositories.module';

import { TrackService } from './track.service';

import { TrackController } from './track.controller';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [AuthModule, RepositoriesModule],
})
export class TrackModule {}
