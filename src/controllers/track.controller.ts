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

import { Track } from '../entities/track.entity';

import { TrackService } from '../services/track.service';

import {
  TrackCreateDto,
  TrackResponseDto,
  TrackUpdateDto,
} from '../dtos/track.dto';

@Controller('track')
@ApiTags('Track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get tracks list' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [TrackResponseDto],
  })
  async getTracks(): Promise<TrackResponseDto[]> {
    return await this.trackService.getTracks();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get single track by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: TrackResponseDto,
  })
  async getTrack(@Param('id') id: Track['id']): Promise<TrackResponseDto> {
    return await this.trackService.getTrack(id);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add new track' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: TrackResponseDto,
  })
  async createTrack(
    @Body()
    payload: TrackCreateDto,
  ): Promise<TrackResponseDto> {
    return await this.trackService.createTrack(payload);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update track information' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: TrackResponseDto,
  })
  async updateTrack(
    @Param('id') id: Track['id'],
    @Body()
    payload: TrackUpdateDto,
  ): Promise<TrackResponseDto> {
    return await this.trackService.updateTrack(id, payload);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete track' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async removeTrack(@Param('id') id: Track['id']): Promise<void> {
    await this.trackService.removeTrack(id);
  }
}
