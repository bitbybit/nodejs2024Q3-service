import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validate as validateUuid } from 'uuid';

import { Track } from '../entities/track.entity';
import { Artist } from '../entities/artist.entity';
import { Album } from '../entities/album.entity';

import { TrackRepository } from '../repositories/track.repository';
import { ArtistRepository } from '../repositories/artist.repository';
import { AlbumRepository } from '../repositories/album.repository';

import { TrackCreateDto, TrackResponseDto, TrackUpdateDto } from './track.dto';

export const trackToTrackResponse = ({
  id,
  name,
  duration,
  artist,
  album,
}: Track): TrackResponseDto => {
  return {
    id,
    name,
    artistId: artist?.id ?? null,
    albumId: album?.id ?? null,
    duration,
  };
};

@Injectable()
export class TrackService {
  constructor(
    private readonly trackRepository: TrackRepository,
    private readonly artistRepository: ArtistRepository,
    private readonly albumRepository: AlbumRepository,
  ) {}

  async getTracks(): Promise<TrackResponseDto[]> {
    const tracks = await this.trackRepository.getAllTracks();

    return tracks.map(trackToTrackResponse);
  }

  async getTrack(trackId: Track['id']): Promise<TrackResponseDto> {
    if (!validateUuid(trackId)) {
      throw new BadRequestException('Track id is invalid');
    }

    const track = await this.trackRepository.findTrackById(trackId);

    if (track === null) {
      throw new NotFoundException(`Track with id ${trackId} is not found`);
    }

    return trackToTrackResponse(track);
  }

  async createTrack({
    name,
    artistId,
    albumId,
    duration,
  }: TrackCreateDto): Promise<TrackResponseDto> {
    const isValidName = typeof name === 'string' && name?.trim() !== '';

    if (!isValidName) {
      throw new BadRequestException('Invalid name');
    }

    const isValidArtistId =
      (typeof artistId === 'string' && artistId?.trim() !== '') ||
      artistId === null;

    if (!isValidArtistId) {
      throw new BadRequestException('Invalid artist id');
    }

    const isValidAlbumId =
      (typeof albumId === 'string' && albumId?.trim() !== '') ||
      albumId === null;

    if (!isValidAlbumId) {
      throw new BadRequestException('Invalid album id');
    }

    const isValidDuration = typeof duration === 'number' && duration > 0;

    if (!isValidDuration) {
      throw new BadRequestException('Invalid duration');
    }

    if (artistId !== null) {
      const artist = this.artistRepository.findArtistById(artistId);

      if (artist === null) {
        throw new BadRequestException(
          `Artist with id ${artistId} is not found`,
        );
      }
    }

    if (albumId !== null) {
      const album = this.albumRepository.findAlbumById(albumId);

      if (album === null) {
        throw new BadRequestException(`Album with id ${albumId} is not found`);
      }
    }

    const track = await this.trackRepository.addTrack(
      name,
      duration,
      artistId,
      albumId,
    );

    return trackToTrackResponse(track);
  }

  async updateTrack(
    trackId: Track['id'],
    { name, artistId, albumId, duration }: TrackUpdateDto,
  ): Promise<TrackResponseDto> {
    if (!validateUuid(trackId)) {
      throw new BadRequestException('Track id is invalid');
    }

    const hasName = name !== undefined;

    const isValidName =
      (typeof name === 'string' && name?.trim() !== '') || !hasName;

    if (!isValidName) {
      throw new BadRequestException('Invalid name');
    }

    const hasArtistId = artistId !== undefined;

    const isValidArtistId =
      (typeof artistId === 'string' && artistId?.trim() !== '') ||
      artistId === null ||
      !hasArtistId;

    if (!isValidArtistId) {
      throw new BadRequestException('Invalid artist id');
    }

    const hasAlbumId = albumId !== undefined;

    const isValidAlbumId =
      (typeof albumId === 'string' && albumId?.trim() !== '') ||
      albumId === null ||
      !hasAlbumId;

    if (!isValidAlbumId) {
      throw new BadRequestException('Invalid album id');
    }

    const hasDuration = duration !== undefined;

    const isValidDuration =
      (typeof duration === 'number' && duration > 0) || !hasDuration;

    if (!isValidDuration) {
      throw new BadRequestException('Invalid duration');
    }

    if (hasArtistId) {
      const artist = this.artistRepository.findArtistById(artistId);

      if (artist === null) {
        throw new BadRequestException(
          `Artist with id ${artistId} is not found`,
        );
      }
    }

    if (hasAlbumId) {
      const album = this.albumRepository.findAlbumById(albumId);

      if (album === null) {
        throw new BadRequestException(`Album with id ${albumId} is not found`);
      }
    }

    const track = await this.trackRepository.findTrackById(trackId);

    if (track === null) {
      throw new NotFoundException(`Track with id ${trackId} is not found`);
    }

    const updatedTrack = await this.trackRepository.updateTrack(trackId, {
      name,
      artist: {
        id: artistId,
      } as Artist,
      album: {
        id: albumId,
      } as Album,
      duration,
    });

    return trackToTrackResponse(updatedTrack);
  }

  async removeTrack(trackId: Track['id']): Promise<void> {
    if (!validateUuid(trackId)) {
      throw new BadRequestException('Track id is invalid');
    }

    const track = await this.trackRepository.findTrackById(trackId);

    if (track === null) {
      throw new NotFoundException(`Track with id ${trackId} is not found`);
    }

    await this.trackRepository.removeTrack(trackId);
  }
}
