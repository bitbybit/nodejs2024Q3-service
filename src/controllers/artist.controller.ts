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

import { Artist } from '../entities/artist.entity';

import { ArtistService } from '../services/artist.service';

import {
  ArtistCreateDto,
  ArtistResponseDto,
  ArtistUpdateDto,
} from '../dtos/artist.dto';

@Controller('artist')
@ApiTags('Artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [ArtistResponseDto],
  })
  async getArtists(): Promise<ArtistResponseDto[]> {
    return await this.artistService.getArtists();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get single artist by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ArtistResponseDto,
  })
  async getArtist(@Param('id') id: Artist['id']): Promise<ArtistResponseDto> {
    return await this.artistService.getArtist(id);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add new artist' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ArtistResponseDto,
  })
  async createArtist(
    @Body() payload: ArtistCreateDto,
  ): Promise<ArtistResponseDto> {
    return await this.artistService.createArtist(payload);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update artist information' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ArtistResponseDto,
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
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async removeArtist(@Param('id') id: Artist['id']): Promise<void> {
    await this.artistService.removeArtist(id);
  }
}
