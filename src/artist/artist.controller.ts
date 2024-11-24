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
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AccessGuard } from '../auth/access.guard';

import { Artist } from '../entities/artist.entity';

import { ArtistService } from './artist.service';

import {
  ArtistCreateDto,
  ArtistResponseDto,
  ArtistUpdateDto,
} from './artist.dto';

@Controller('artist')
@UseGuards(AccessGuard)
@ApiTags('Artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation',
    type: [ArtistResponseDto],
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is missing or invalid',
  })
  async getArtists(): Promise<ArtistResponseDto[]> {
    return await this.artistService.getArtists();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get single artist by id' })
  @ApiParam({
    name: 'id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation',
    type: ArtistResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist was not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is missing or invalid',
  })
  async getArtist(@Param('id') id: Artist['id']): Promise<ArtistResponseDto> {
    return await this.artistService.getArtist(id);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add new artist' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful operation',
    type: ArtistResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. body does not contain required fields',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is missing or invalid',
  })
  async createArtist(
    @Body() payload: ArtistCreateDto,
  ): Promise<ArtistResponseDto> {
    return await this.artistService.createArtist(payload);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update artist information' })
  @ApiParam({
    name: 'id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The artist has been updated.',
    type: ArtistResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist was not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is missing or invalid',
  })
  async updateArtist(
    @Param('id') id: Artist['id'],
    @Body()
    payload: ArtistUpdateDto,
  ): Promise<ArtistResponseDto> {
    return await this.artistService.updateArtist(id, payload);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete artist' })
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
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is missing or invalid',
  })
  async removeArtist(@Param('id') id: Artist['id']): Promise<void> {
    await this.artistService.removeArtist(id);
  }
}
