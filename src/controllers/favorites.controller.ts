import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { Track } from '../entities/track.entity';
import { Album } from '../entities/album.entity';
import { Artist } from '../entities/artist.entity';

import {
  type FavoritesAddedResponse,
  type FavoritesResponse,
  FavoritesService,
} from '../services/favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getFavorites(): Promise<FavoritesResponse> {
    return await this.favoritesService.getFavorites();
  }

  @Post('/track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addFavoriteTrack(
    @Param('id') id: Track['id'],
  ): Promise<FavoritesAddedResponse> {
    return await this.favoritesService.addFavoriteTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeFavoriteTrack(@Param('id') id: Track['id']): Promise<void> {
    await this.favoritesService.removeFavoriteTrack(id);
  }

  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addFavoriteAlbum(
    @Param('id') id: Album['id'],
  ): Promise<FavoritesAddedResponse> {
    return await this.favoritesService.addFavoriteAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeFavoriteAlbum(@Param('id') id: Album['id']): Promise<void> {
    await this.favoritesService.removeFavoriteAlbum(id);
  }

  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addFavoriteArtist(
    @Param('id') id: Artist['id'],
  ): Promise<FavoritesAddedResponse> {
    return await this.favoritesService.addFavoriteArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeFavoriteArtist(@Param('id') id: Artist['id']): Promise<void> {
    await this.favoritesService.removeFavoriteArtist(id);
  }
}
