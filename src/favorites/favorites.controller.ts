import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Track } from '../entities/track.entity';
import { Album } from '../entities/album.entity';
import { Artist } from '../entities/artist.entity';

import { FavoritesService } from './favorites.service';

import {
  FavoritesAddedResponseDto,
  FavoritesResponseDto,
} from './favorites.dto';

@Controller('favs')
@ApiTags('Favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation',
    type: FavoritesResponseDto,
  })
  async getFavorites(): Promise<FavoritesResponseDto> {
    return await this.favoritesService.getFavorites();
  }

  @Post('/track/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add track to favorites' })
  @ApiParam({
    name: 'id',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Added successfully',
    type: FavoritesAddedResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: "Track with id doesn't exist.",
  })
  async addFavoriteTrack(
    @Param('id') id: Track['id'],
  ): Promise<FavoritesAddedResponseDto> {
    return await this.favoritesService.addFavoriteTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete track from favorites' })
  @ApiParam({
    name: 'id',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Track was not found.',
  })
  async removeFavoriteTrack(@Param('id') id: Track['id']): Promise<void> {
    await this.favoritesService.removeFavoriteTrack(id);
  }

  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add album to favorites' })
  @ApiParam({
    name: 'id',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Added successfully',
    type: FavoritesAddedResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: "Album with id doesn't exist.",
  })
  async addFavoriteAlbum(
    @Param('id') id: Album['id'],
  ): Promise<FavoritesAddedResponseDto> {
    return await this.favoritesService.addFavoriteAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete album from favorites' })
  @ApiParam({
    name: 'id',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album was not found.',
  })
  async removeFavoriteAlbum(@Param('id') id: Album['id']): Promise<void> {
    await this.favoritesService.removeFavoriteAlbum(id);
  }

  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add artist to favorites' })
  @ApiParam({
    name: 'id',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Added successfully',
    type: FavoritesAddedResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: "Artist with id doesn't exist.",
  })
  async addFavoriteArtist(
    @Param('id') id: Artist['id'],
  ): Promise<FavoritesAddedResponseDto> {
    return await this.favoritesService.addFavoriteArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete artist from favorites' })
  @ApiParam({
    name: 'id',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist was not found.',
  })
  async removeFavoriteArtist(@Param('id') id: Artist['id']): Promise<void> {
    await this.favoritesService.removeFavoriteArtist(id);
  }
}
