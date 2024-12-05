import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validate as validateUuid } from 'uuid';

import { Album } from '../entities/album.entity';
import { Artist } from '../entities/artist.entity';

import { AlbumRepository } from '../repositories/album.repository';
import { ArtistRepository } from '../repositories/artist.repository';

import { AlbumCreateDto, AlbumResponseDto, AlbumUpdateDto } from './album.dto';

export const albumToAlbumResponse = ({
  id,
  name,
  year,
  artist,
}: Album): AlbumResponseDto => {
  return {
    id,
    name,
    year,
    artistId: artist?.id ?? null,
  };
};

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly artistRepository: ArtistRepository,
  ) {}

  async getAlbums(): Promise<AlbumResponseDto[]> {
    const albums = await this.albumRepository.getAllAlbums();

    return albums.map(albumToAlbumResponse);
  }

  async getAlbum(albumId: Album['id']): Promise<AlbumResponseDto> {
    if (!validateUuid(albumId)) {
      throw new BadRequestException('Album id is invalid');
    }

    const album = await this.albumRepository.findAlbumById(albumId);

    if (album === null) {
      throw new NotFoundException(`Album with id ${albumId} is not found`);
    }

    return albumToAlbumResponse(album);
  }

  async createAlbum({
    name,
    year,
    artistId,
  }: AlbumCreateDto): Promise<AlbumResponseDto> {
    const isValidName = typeof name === 'string' && name?.trim() !== '';

    if (!isValidName) {
      throw new BadRequestException('Invalid name');
    }

    const isValidYear = typeof year === 'number' && year > 0;

    if (!isValidYear) {
      throw new BadRequestException('Invalid year');
    }

    const isValidArtistId =
      (typeof artistId === 'string' && artistId?.trim() !== '') ||
      artistId === null;

    if (!isValidArtistId) {
      throw new BadRequestException('Invalid artist id');
    }

    if (artistId !== null) {
      const artist = this.artistRepository.findArtistById(artistId);

      if (artist === null) {
        throw new BadRequestException(
          `Artist with id ${artistId} is not found`,
        );
      }
    }

    const album = await this.albumRepository.addAlbum(name, year, artistId);

    return albumToAlbumResponse(album);
  }

  async updateAlbum(
    albumId: Album['id'],
    { name, year, artistId }: AlbumUpdateDto,
  ): Promise<AlbumResponseDto> {
    if (!validateUuid(albumId)) {
      throw new BadRequestException('Album id is invalid');
    }

    const hasName = name !== undefined;

    const isValidName =
      (typeof name === 'string' && name?.trim() !== '') || !hasName;

    if (!isValidName) {
      throw new BadRequestException('Invalid name');
    }

    const hasYear = year !== undefined;

    const isValidYear = (typeof year === 'number' && year > 0) || !hasYear;

    if (!isValidYear) {
      throw new BadRequestException('Invalid year');
    }

    const hasArtistId = artistId !== undefined;

    const isValidArtistId =
      (typeof artistId === 'string' && artistId?.trim() !== '') ||
      artistId === null ||
      !hasArtistId;

    if (!isValidArtistId) {
      throw new BadRequestException('Invalid artist id');
    }

    if (hasArtistId) {
      const artist = this.artistRepository.findArtistById(artistId);

      if (artist === null) {
        throw new BadRequestException(
          `Artist with id ${artistId} is not found`,
        );
      }
    }

    const album = await this.albumRepository.findAlbumById(albumId);

    if (album === null) {
      throw new NotFoundException(`Album with id ${albumId} is not found`);
    }

    const updatedAlbum = await this.albumRepository.updateAlbum(albumId, {
      name,
      year,
      artist: {
        id: artistId,
      } as Artist,
    });

    return albumToAlbumResponse(updatedAlbum);
  }

  async removeAlbum(albumId: Album['id']): Promise<void> {
    if (!validateUuid(albumId)) {
      throw new BadRequestException('Album id is invalid');
    }

    const album = await this.albumRepository.findAlbumById(albumId);

    if (album === null) {
      throw new NotFoundException(`Album with id ${albumId} is not found`);
    }

    await this.albumRepository.removeAlbum(albumId);
  }
}
