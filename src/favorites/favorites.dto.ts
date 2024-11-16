import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ArtistResponseDto } from '../artist/artist.dto';
import { AlbumResponseDto } from '../album/album.dto';
import { TrackResponseDto } from '../track/track.dto';

export class FavoritesResponseDto {
  @IsArray()
  @ApiProperty({ type: [ArtistResponseDto] })
  artists: ArtistResponseDto[];

  @IsArray()
  @ApiProperty({ type: [AlbumResponseDto] })
  albums: AlbumResponseDto[];

  @IsArray()
  @ApiProperty({ type: [TrackResponseDto] })
  tracks: TrackResponseDto[];
}

export class FavoritesAddedResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  message: string;
}
