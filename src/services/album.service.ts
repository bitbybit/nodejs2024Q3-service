import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate as validateUuid } from 'uuid';

import { Album } from '../entities/album.entity';
import { Artist } from '../entities/artist.entity';

import { AlbumRepository } from '../repositories/album.repository';
import { ArtistRepository } from '../repositories/artist.repository';

import {
  AlbumCreateDto,
  AlbumResponseDto,
  AlbumUpdateDto,
} from '../dtos/album.dto';

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
      throw new HttpException('Album id is invalid', HttpStatus.BAD_REQUEST);
    }

    const album = await this.albumRepository.findAlbumById(albumId);

    if (album === null) {
      throw new HttpException(
        `Album with id ${albumId} is not found`,
        HttpStatus.NOT_FOUND,
      );
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
      throw new HttpException('Invalid name', HttpStatus.BAD_REQUEST);
    }

    const isValidYear = typeof year === 'number' && year > 0;

    if (!isValidYear) {
      throw new HttpException('Invalid year', HttpStatus.BAD_REQUEST);
    }

    const isValidArtistId =
      (typeof artistId === 'string' && artistId?.trim() !== '') ||
      artistId === null;

    if (!isValidArtistId) {
      throw new HttpException('Invalid artist id', HttpStatus.BAD_REQUEST);
    }

    if (artistId !== null) {
      const artist = this.artistRepository.findArtistById(artistId);

      if (artist === null) {
        throw new HttpException(
          `Artist with id ${artistId} is not found`,
          HttpStatus.BAD_REQUEST,
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
      throw new HttpException('Album id is invalid', HttpStatus.BAD_REQUEST);
    }

    const hasName = name !== undefined;

    const isValidName =
      (typeof name === 'string' && name?.trim() !== '') || !hasName;

    if (!isValidName) {
      throw new HttpException('Invalid name', HttpStatus.BAD_REQUEST);
    }

    const hasYear = year !== undefined;

    const isValidYear = (typeof year === 'number' && year > 0) || !hasYear;

    if (!isValidYear) {
      throw new HttpException('Invalid year', HttpStatus.BAD_REQUEST);
    }

    const hasArtistId = artistId !== undefined;

    const isValidArtistId =
      (typeof artistId === 'string' && artistId?.trim() !== '') ||
      artistId === null ||
      !hasArtistId;

    if (!isValidArtistId) {
      throw new HttpException('Invalid artist id', HttpStatus.BAD_REQUEST);
    }

    if (hasArtistId) {
      const artist = this.artistRepository.findArtistById(artistId);

      if (artist === null) {
        throw new HttpException(
          `Artist with id ${artistId} is not found`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const album = await this.albumRepository.findAlbumById(albumId);

    if (album === null) {
      throw new HttpException(
        `Album with id ${albumId} is not found`,
        HttpStatus.NOT_FOUND,
      );
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
      throw new HttpException('Album id is invalid', HttpStatus.BAD_REQUEST);
    }

    const album = await this.albumRepository.findAlbumById(albumId);

    if (album === null) {
      throw new HttpException(
        `Album with id ${albumId} is not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.albumRepository.removeAlbum(albumId);
  }
}
