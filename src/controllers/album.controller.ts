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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Album } from '../entities/album.entity';

import { AlbumService } from '../services/album.service';

import {
  AlbumCreateDto,
  AlbumResponseDto,
  AlbumUpdateDto,
} from '../dtos/album.dto';

@Controller('album')
@ApiTags('Albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get albums list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation',
    type: [AlbumResponseDto],
  })
  async getAlbums(): Promise<AlbumResponseDto[]> {
    return await this.albumService.getAlbums();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get single album by id' })
  @ApiParam({
    name: 'id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation',
    type: AlbumResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album was not found.',
  })
  async getAlbum(@Param('id') id: Album['id']): Promise<AlbumResponseDto> {
    return await this.albumService.getAlbum(id);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add new album' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Album is created',
    type: AlbumResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. body does not contain required fields',
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
  @ApiParam({
    name: 'id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The album has been updated.',
    type: AlbumResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album was not found.',
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
  @ApiParam({
    name: 'id',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album was not found.',
  })
  async removeAlbum(@Param('id') id: Album['id']): Promise<void> {
    await this.albumService.removeAlbum(id);
  }
}
