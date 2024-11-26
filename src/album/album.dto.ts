import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Album } from '../entities/album.entity';

export class AlbumCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: Album['name'];

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  year: Album['year'];

  @IsString()
  @ApiProperty({ type: String, nullable: true })
  artistId: Album['artist']['id'] | null;
}

export class AlbumUpdateDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  name?: Album['name'];

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  year?: Album['year'];

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, nullable: true, required: false })
  artistId?: Album['artist']['id'] | null;
}

export class AlbumResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  id: Album['id'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: Album['name'];

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  year: Album['year'];

  @IsString()
  @ApiProperty({ type: String, nullable: true })
  artistId: Album['artist']['id'] | null;
}
