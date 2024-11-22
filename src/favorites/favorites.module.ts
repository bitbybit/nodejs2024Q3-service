import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { RepositoriesModule } from '../repositories/repositories.module';

import { FavoritesService } from './favorites.service';

import { FavoritesController } from './favorites.controller';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [AuthModule, RepositoriesModule],
})
export class FavoritesModule {}
