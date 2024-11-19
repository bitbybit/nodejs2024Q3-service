import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Artist } from '../entities/artist.entity';

export class ArtistCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: Artist['name'];

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ type: Boolean })
  grammy: Artist['grammy'];
}

export class ArtistUpdateDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  name?: Artist['name'];

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ type: Boolean, required: false })
  grammy?: Artist['grammy'];
}

export class ArtistResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  id: Artist['id'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: Artist['name'];

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ type: Boolean })
  grammy: Artist['grammy'];
}
