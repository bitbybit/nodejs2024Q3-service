import { Module } from '@nestjs/common';

import { RepositoriesModule } from '../repositories/repositories.module';

import { FavoritesService } from './favorites.service';

import { FavoritesController } from './favorites.controller';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [RepositoriesModule],
})
export class FavoritesModule {}
