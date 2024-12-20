import { Module } from '@nestjs/common';

import { AuthorizationModule } from '../authorization/authorization.module';
import { RepositoriesModule } from '../repositories/repositories.module';

import { TrackService } from './track.service';

import { TrackController } from './track.controller';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [AuthorizationModule, RepositoriesModule],
})
export class TrackModule {}
