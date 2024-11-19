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

import { Track } from '../entities/track.entity';

import { TrackService } from '../services/track.service';

import {
  TrackCreateDto,
  TrackResponseDto,
  TrackUpdateDto,
} from '../dtos/track.dto';

@Controller('track')
@ApiTags('Tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get tracks list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation',
    type: [TrackResponseDto],
  })
  async getTracks(): Promise<TrackResponseDto[]> {
    return await this.trackService.getTracks();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get single track by id' })
  @ApiParam({
    name: 'id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation',
    type: TrackResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Track was not found.',
  })
  async getTrack(@Param('id') id: Track['id']): Promise<TrackResponseDto> {
    return await this.trackService.getTrack(id);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add new track' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful operation',
    type: TrackResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. body does not contain required fields',
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
  @ApiParam({
    name: 'id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The track has been updated.',
    type: TrackResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Track was not found.',
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
  @ApiParam({
    name: 'id',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Track was not found.',
  })
  async removeTrack(@Param('id') id: Track['id']): Promise<void> {
    await this.trackService.removeTrack(id);
  }
}
