import { Album } from '../entities/album.entity';

import { ApiProperty } from '@nestjs/swagger';

export class AlbumCreateDto {
  @ApiProperty({ type: String })
  name: Album['name'];

  @ApiProperty({ type: Number })
  year: Album['year'];

  @ApiProperty({ type: String, nullable: true })
  artistId: Album['artist']['id'] | null;
}

export class AlbumUpdateDto {
  @ApiProperty({ type: String, required: false })
  name?: Album['name'];

  @ApiProperty({ type: Number, required: false })
  year?: Album['year'];

  @ApiProperty({ type: String, nullable: true, required: false })
  artistId?: Album['artist']['id'] | null;
}

export class AlbumResponseDto {
  @ApiProperty({ type: String })
  id: Album['id'];

  @ApiProperty({ type: String })
  name: Album['name'];

  @ApiProperty({ type: Number })
  year: Album['year'];

  @ApiProperty({ type: String, nullable: true })
  artistId: Album['artist']['id'] | null;
}
