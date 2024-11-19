import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate as validateUuid } from 'uuid';

import { Artist } from '../entities/artist.entity';

import { ArtistRepository } from '../repositories/artist.repository';

import {
  ArtistCreateDto,
  ArtistResponseDto,
  ArtistUpdateDto,
} from '../dtos/artist.dto';

export const artistToArtistResponse = ({
  id,
  name,
  grammy,
}: Artist): ArtistResponseDto => {
  return {
    id,
    name,
    grammy,
  };
};

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  async getArtists(): Promise<ArtistResponseDto[]> {
    const artists = await this.artistRepository.getAllArtists();

    return artists.map(artistToArtistResponse);
  }

  async getArtist(artistId: Artist['id']): Promise<ArtistResponseDto> {
    if (!validateUuid(artistId)) {
      throw new HttpException('Artist id is invalid', HttpStatus.BAD_REQUEST);
    }

    const artist = await this.artistRepository.findArtistById(artistId);

    if (artist === null) {
      throw new HttpException(
        `Artist with id ${artistId} is not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return artistToArtistResponse(artist);
  }

  async createArtist({
    name,
    grammy,
  }: ArtistCreateDto): Promise<ArtistResponseDto> {
    const isValidName = typeof name === 'string' && name?.trim() !== '';

    if (!isValidName) {
      throw new HttpException('Invalid name', HttpStatus.BAD_REQUEST);
    }

    const isValidGrammy = typeof grammy === 'boolean';

    if (!isValidGrammy) {
      throw new HttpException('Invalid grammy', HttpStatus.BAD_REQUEST);
    }

    const artist = await this.artistRepository.addArtist(name, grammy);

    return artistToArtistResponse(artist);
  }

  async updateArtist(
    artistId: Artist['id'],
    { name, grammy }: ArtistUpdateDto,
  ): Promise<ArtistResponseDto> {
    if (!validateUuid(artistId)) {
      throw new HttpException('Artist id is invalid', HttpStatus.BAD_REQUEST);
    }

    const hasName = name !== undefined;

    const isValidName =
      (typeof name === 'string' && name?.trim() !== '') || !hasName;

    if (!isValidName) {
      throw new HttpException('Invalid name', HttpStatus.BAD_REQUEST);
    }

    const hasGrammy = grammy !== undefined;

    const isValidGrammy = typeof grammy === 'boolean' || !hasGrammy;

    if (!isValidGrammy) {
      throw new HttpException('Invalid grammy', HttpStatus.BAD_REQUEST);
    }

    const artist = await this.artistRepository.findArtistById(artistId);

    if (artist === null) {
      throw new HttpException(
        `Artist with id ${artistId} is not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedArtist = await this.artistRepository.updateArtist(artistId, {
      name,
      grammy,
    });

    return artistToArtistResponse(updatedArtist);
  }

  async removeArtist(artistId: Artist['id']): Promise<void> {
    if (!validateUuid(artistId)) {
      throw new HttpException('Artist id is invalid', HttpStatus.BAD_REQUEST);
    }

    const artist = await this.artistRepository.findArtistById(artistId);

    if (artist === null) {
      throw new HttpException(
        `Artist with id ${artistId} is not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.artistRepository.removeArtist(artistId);
  }
}
