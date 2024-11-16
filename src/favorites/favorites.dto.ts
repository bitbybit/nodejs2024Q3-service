import { ApiProperty } from '@nestjs/swagger';

import { ArtistResponseDto } from '../artist/artist.dto';
import { AlbumResponseDto } from '../album/album.dto';
import { TrackResponseDto } from '../track/track.dto';

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
