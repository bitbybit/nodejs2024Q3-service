import { ApiProperty } from '@nestjs/swagger';

import { Artist } from '../entities/artist.entity';

export class ArtistCreateDto {
  @ApiProperty({ type: String })
  name: Artist['name'];

  @ApiProperty({ type: Boolean })
  grammy: Artist['grammy'];
}

export class ArtistUpdateDto {
  @ApiProperty({ type: String, required: false })
  name?: Artist['name'];

  @ApiProperty({ type: Boolean, required: false })
  grammy?: Artist['grammy'];
}

export class ArtistResponseDto {
  @ApiProperty({ type: String })
  id: Artist['id'];

  @ApiProperty({ type: String })
  name: Artist['name'];

  @ApiProperty({ type: Boolean })
  grammy: Artist['grammy'];
}
