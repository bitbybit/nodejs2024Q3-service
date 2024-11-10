import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Track } from '../entities/track.entity';
import { Album } from '../entities/album.entity';
import { Artist } from '../entities/artist.entity';

import { FavoritesService } from '../services/favorites.service';

import {
  FavoritesAddedResponseDto,
  FavoritesResponseDto,
} from '../dtos/favorites.dto';

@Controller('favs')
@ApiTags('Favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FavoritesResponseDto,
  })
  async getFavorites(): Promise<FavoritesResponseDto> {
    return await this.favoritesService.getFavorites();
  }

  @Post('/track/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add track to favorites' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: FavoritesAddedResponseDto,
  })
  async addFavoriteTrack(
    @Param('id') id: Track['id'],
  ): Promise<FavoritesAddedResponseDto> {
    return await this.favoritesService.addFavoriteTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete track from favorites' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async removeFavoriteTrack(@Param('id') id: Track['id']): Promise<void> {
    await this.favoritesService.removeFavoriteTrack(id);
  }

  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add album to favorites' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: FavoritesAddedResponseDto,
  })
  async addFavoriteAlbum(
    @Param('id') id: Album['id'],
  ): Promise<FavoritesAddedResponseDto> {
    return await this.favoritesService.addFavoriteAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete album from favorites' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async removeFavoriteAlbum(@Param('id') id: Album['id']): Promise<void> {
    await this.favoritesService.removeFavoriteAlbum(id);
  }

  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add artist to favorites' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: FavoritesAddedResponseDto,
  })
  async addFavoriteArtist(
    @Param('id') id: Artist['id'],
  ): Promise<FavoritesAddedResponseDto> {
    return await this.favoritesService.addFavoriteArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete artist from favorites' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async removeFavoriteArtist(@Param('id') id: Artist['id']): Promise<void> {
    await this.favoritesService.removeFavoriteArtist(id);
  }
}
