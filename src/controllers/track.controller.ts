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

import { Track } from '../entities/track.entity';

import { type TrackResponse, TrackService } from '../services/track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getTracks(): Promise<TrackResponse[]> {
    return await this.trackService.getTracks();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getTrack(@Param('id') id: Track['id']): Promise<TrackResponse> {
    return await this.trackService.getTrack(id);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createTrack(
    @Body()
    payload: {
      name: Track['name'];
      artistId: Track['artist']['id'] | null;
      albumId: Track['album']['id'] | null;
      duration: Track['duration'];
    },
  ): Promise<TrackResponse> {
    return await this.trackService.createTrack(payload);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updateTrack(
    @Param('id') id: Track['id'],
    @Body()
    payload: {
      name?: Track['name'];
      artistId?: Track['artist']['id'] | null;
      albumId?: Track['album']['id'] | null;
      duration?: Track['duration'];
    },
  ): Promise<TrackResponse> {
    return await this.trackService.updateTrack(id, payload);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(@Param('id') id: Track['id']): Promise<void> {
    await this.trackService.removeTrack(id);
  }
}
