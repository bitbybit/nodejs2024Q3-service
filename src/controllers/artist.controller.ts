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
import { Artist } from '../entities/artist.entity';
import { type ArtistResponse, ArtistService } from '../services/artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getArtists(): Promise<ArtistResponse[]> {
    return await this.artistService.getArtists();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getArtist(@Param('id') id: Artist['id']): Promise<ArtistResponse> {
    return await this.artistService.getArtist(id);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createArtist(
    @Body() payload: { name: Artist['name']; grammy: Artist['grammy'] },
  ): Promise<ArtistResponse> {
    return await this.artistService.createArtist(payload);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updateArtist(
    @Param('id') id: Artist['id'],
    @Body()
    payload: { name?: Artist['name']; grammy?: Artist['grammy'] },
  ): Promise<ArtistResponse> {
    return await this.artistService.updateArtist(id, payload);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(@Param('id') id: Artist['id']): Promise<void> {
    await this.artistService.removeArtist(id);
  }
}
