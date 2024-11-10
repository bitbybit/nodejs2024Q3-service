import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Album } from '../entities/album.entity';
import { type AlbumResponse, AlbumService } from '../services/album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAlbums(): Promise<AlbumResponse[]> {
    return await this.albumService.getAlbums();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getAlbum(@Param('id') id: Album['id']): Promise<AlbumResponse> {
    return await this.albumService.getAlbum(id);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createAlbum(
    @Body()
    payload: {
      name: Album['name'];
      year: Album['year'];
      artistId: Album['artist']['id'] | null;
    },
  ): Promise<AlbumResponse> {
    return await this.albumService.createAlbum(payload);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updateAlbum(
    @Param('id') id: Album['id'],
    @Body()
    payload: {
      name?: Album['name'];
      year?: Album['year'];
      artistId?: Album['artist']['id'] | null;
    },
  ): Promise<AlbumResponse> {
    return await this.albumService.updateAlbum(id, payload);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(@Param('id') id: Album['id']): Promise<void> {
    await this.albumService.removeAlbum(id);
  }
}
