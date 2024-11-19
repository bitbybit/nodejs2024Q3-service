import { ApiProperty } from '@nestjs/swagger';

import { ArtistResponseDto } from './artist.dto';
import { AlbumResponseDto } from './album.dto';
import { TrackResponseDto } from './track.dto';

export class FavoritesResponseDto {
  @ApiProperty({ type: [ArtistResponseDto] })
  artists: ArtistResponseDto[];

  @ApiProperty({ type: [AlbumResponseDto] })
  albums: AlbumResponseDto[];

  @ApiProperty({ type: [TrackResponseDto] })
  tracks: TrackResponseDto[];
}

export class FavoritesAddedResponseDto {
  @ApiProperty()
  message: string;
}
