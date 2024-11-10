import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Artist } from '../entities/artist.entity';
import { ArtistRepository } from '../repositories/artist.repository';
import { validate as validateUuid } from 'uuid';

export type ArtistResponse = {
  id: Artist['id'];
  name: Artist['name'];
  grammy: Artist['grammy'];
};

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  #artistToArtistResponse({ id, name, grammy }: Artist): ArtistResponse {
    return {
      id,
      name,
      grammy,
    };
  }

  async getArtists(): Promise<ArtistResponse[]> {
    const artists = await this.artistRepository.getAllArtists();

    return artists.map(this.#artistToArtistResponse);
  }

  async getArtist(artistId: Artist['id']): Promise<ArtistResponse> {
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

    return this.#artistToArtistResponse(artist);
  }

  async createArtist({
    name,
    grammy,
  }: {
    name: Artist['name'];
    grammy: Artist['grammy'];
  }): Promise<ArtistResponse> {
    const isValidName = typeof name === 'string' && name?.trim() !== '';

    if (!isValidName) {
      throw new HttpException('Invalid name', HttpStatus.BAD_REQUEST);
    }

    const isValidGrammy = typeof grammy === 'boolean';

    if (!isValidGrammy) {
      throw new HttpException('Invalid grammy', HttpStatus.BAD_REQUEST);
    }

    const artist = await this.artistRepository.addArtist(name, grammy);

    return this.#artistToArtistResponse(artist);
  }

  async updateArtist(
    artistId: Artist['id'],
    {
      name,
      grammy,
    }: {
      name?: Artist['name'];
      grammy?: Artist['grammy'];
    },
  ): Promise<ArtistResponse> {
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

    return this.#artistToArtistResponse(updatedArtist);
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