import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Track } from '../entities/track.entity';

export class TrackCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: Track['name'];

  @IsString()
  @ApiProperty({ type: String, nullable: true })
  artistId: Track['artist']['id'] | null;

  @IsString()
  @ApiProperty({ type: String, nullable: true })
  albumId: Track['album']['id'] | null;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  duration: Track['duration'];
}

export class TrackUpdateDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  name?: Track['name'];

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, nullable: true, required: false })
  artistId?: Track['artist']['id'] | null;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, nullable: true, required: false })
  albumId?: Track['album']['id'] | null;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  duration?: Track['duration'];
}

export class TrackResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  id: Track['id'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: Track['name'];

  @IsString()
  @ApiProperty({ type: String, nullable: true })
  artistId: Track['artist']['id'] | null;

  @IsString()
  @ApiProperty({ type: String, nullable: true })
  albumId: Track['album']['id'] | null;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  duration: Track['duration'];
}
