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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Album } from '../entities/album.entity';

import { AlbumService } from '../services/album.service';

import {
  AlbumCreateDto,
  AlbumResponseDto,
  AlbumUpdateDto,
} from '../dtos/album.dto';

@Controller('album')
@ApiTags('Album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get albums list' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [AlbumResponseDto],
  })
  async getAlbums(): Promise<AlbumResponseDto[]> {
    return await this.albumService.getAlbums();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get single album by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AlbumResponseDto,
  })
  async getAlbum(@Param('id') id: Album['id']): Promise<AlbumResponseDto> {
    return await this.albumService.getAlbum(id);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add new album' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: AlbumResponseDto,
  })
  async createAlbum(
    @Body()
    payload: AlbumCreateDto,
  ): Promise<AlbumResponseDto> {
    return await this.albumService.createAlbum(payload);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update album information' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AlbumResponseDto,
  })
  async updateAlbum(
    @Param('id') id: Album['id'],
    @Body()
    payload: AlbumUpdateDto,
  ): Promise<AlbumResponseDto> {
    return await this.albumService.updateAlbum(id, payload);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete album' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async removeAlbum(@Param('id') id: Album['id']): Promise<void> {
    await this.albumService.removeAlbum(id);
  }
}
