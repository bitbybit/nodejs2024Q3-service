import { ApiProperty } from '@nestjs/swagger';

import { Track } from '../entities/track.entity';

export class TrackCreateDto {
  @ApiProperty({ type: String })
  name: Track['name'];

  @ApiProperty({ type: String, nullable: true })
  artistId: Track['artist']['id'] | null;

  @ApiProperty({ type: String, nullable: true })
  albumId: Track['album']['id'] | null;

  @ApiProperty({ type: Number })
  duration: Track['duration'];
}

export class TrackUpdateDto {
  @ApiProperty({ type: String, required: false })
  name?: Track['name'];

  @ApiProperty({ type: String, nullable: true, required: false })
  artistId?: Track['artist']['id'] | null;

  @ApiProperty({ type: String, nullable: true, required: false })
  albumId?: Track['album']['id'] | null;

  @ApiProperty({ type: Number, required: false })
  duration?: Track['duration'];
}

export class TrackResponseDto {
  @ApiProperty({ type: String })
  id: Track['id'];

  @ApiProperty({ type: String })
  name: Track['name'];

  @ApiProperty({ type: String, nullable: true })
  artistId: Track['artist']['id'] | null;

  @ApiProperty({ type: String, nullable: true })
  albumId: Track['album']['id'] | null;

  @ApiProperty({ type: Number })
  duration: Track['duration'];
}
