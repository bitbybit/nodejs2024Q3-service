import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validate as validateUuid } from 'uuid';

import { Artist } from '../entities/artist.entity';

import { ArtistRepository } from '../repositories/artist.repository';

import {
  ArtistCreateDto,
  ArtistResponseDto,
  ArtistUpdateDto,
} from './artist.dto';

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
      throw new BadRequestException('Artist id is invalid');
    }

    const artist = await this.artistRepository.findArtistById(artistId);

    if (artist === null) {
      throw new NotFoundException(`Artist with id ${artistId} is not found`);
    }

    return artistToArtistResponse(artist);
  }

  async createArtist({
    name,
    grammy,
  }: ArtistCreateDto): Promise<ArtistResponseDto> {
    const isValidName = typeof name === 'string' && name?.trim() !== '';

    if (!isValidName) {
      throw new BadRequestException('Invalid name');
    }

    const isValidGrammy = typeof grammy === 'boolean';

    if (!isValidGrammy) {
      throw new BadRequestException('Invalid grammy');
    }

    const artist = await this.artistRepository.addArtist(name, grammy);

    return artistToArtistResponse(artist);
  }

  async updateArtist(
    artistId: Artist['id'],
    { name, grammy }: ArtistUpdateDto,
  ): Promise<ArtistResponseDto> {
    if (!validateUuid(artistId)) {
      throw new BadRequestException('Artist id is invalid');
    }

    const hasName = name !== undefined;

    const isValidName =
      (typeof name === 'string' && name?.trim() !== '') || !hasName;

    if (!isValidName) {
      throw new BadRequestException('Invalid name');
    }

    const hasGrammy = grammy !== undefined;

    const isValidGrammy = typeof grammy === 'boolean' || !hasGrammy;

    if (!isValidGrammy) {
      throw new BadRequestException('Invalid grammy');
    }

    const artist = await this.artistRepository.findArtistById(artistId);

    if (artist === null) {
      throw new NotFoundException(`Artist with id ${artistId} is not found`);
    }

    const updatedArtist = await this.artistRepository.updateArtist(artistId, {
      name,
      grammy,
    });

    return artistToArtistResponse(updatedArtist);
  }

  async removeArtist(artistId: Artist['id']): Promise<void> {
    if (!validateUuid(artistId)) {
      throw new BadRequestException('Artist id is invalid');
    }

    const artist = await this.artistRepository.findArtistById(artistId);

    if (artist === null) {
      throw new NotFoundException(`Artist with id ${artistId} is not found`);
    }

    await this.artistRepository.removeArtist(artistId);
  }
}
