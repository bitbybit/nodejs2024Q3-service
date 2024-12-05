import { Module } from '@nestjs/common';

import { AuthorizationModule } from '../authorization/authorization.module';
import { RepositoriesModule } from '../repositories/repositories.module';

import { FavoritesService } from './favorites.service';

import { FavoritesController } from './favorites.controller';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [AuthorizationModule, RepositoriesModule],
})
export class FavoritesModule {}
