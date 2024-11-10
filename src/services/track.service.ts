import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate as validateUuid } from 'uuid';

import { Track } from '../entities/track.entity';
import { Artist } from '../entities/artist.entity';
import { Album } from '../entities/album.entity';

import { TrackRepository } from '../repositories/track.repository';
import { ArtistRepository } from '../repositories/artist.repository';
import { AlbumRepository } from '../repositories/album.repository';

export type TrackResponse = {
  id: Track['id'];
  name: Track['name'];
  artistId: Track['artist']['id'] | null;
  albumId: Track['album']['id'] | null;
  duration: Track['duration'];
};

export const trackToTrackResponse = ({
  id,
  name,
  duration,
  artist,
  album,
}: Track): TrackResponse => {
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

  async getTracks(): Promise<TrackResponse[]> {
    const tracks = await this.trackRepository.getAllTracks();

    return tracks.map(trackToTrackResponse);
  }

  async getTrack(trackId: Track['id']): Promise<TrackResponse> {
    if (!validateUuid(trackId)) {
      throw new HttpException('Track id is invalid', HttpStatus.BAD_REQUEST);
    }

    const track = await this.trackRepository.findTrackById(trackId);

    if (track === null) {
      throw new HttpException(
        `Track with id ${trackId} is not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return trackToTrackResponse(track);
  }

  async createTrack({
    name,
    artistId,
    albumId,
    duration,
  }: {
    name: Track['name'];
    artistId: Track['artist']['id'] | null;
    albumId: Track['album']['id'] | null;
    duration: Track['duration'];
  }): Promise<TrackResponse> {
    const isValidName = typeof name === 'string' && name?.trim() !== '';

    if (!isValidName) {
      throw new HttpException('Invalid name', HttpStatus.BAD_REQUEST);
    }

    const isValidArtistId =
      (typeof artistId === 'string' && artistId?.trim() !== '') ||
      artistId === null;

    if (!isValidArtistId) {
      throw new HttpException('Invalid artist id', HttpStatus.BAD_REQUEST);
    }

    const isValidAlbumId =
      (typeof albumId === 'string' && albumId?.trim() !== '') ||
      albumId === null;

    if (!isValidAlbumId) {
      throw new HttpException('Invalid album id', HttpStatus.BAD_REQUEST);
    }

    const isValidDuration = typeof duration === 'number' && duration > 0;

    if (!isValidDuration) {
      throw new HttpException('Invalid duration', HttpStatus.BAD_REQUEST);
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

    if (albumId !== null) {
      const album = this.albumRepository.findAlbumById(albumId);

      if (album === null) {
        throw new HttpException(
          `Album with id ${albumId} is not found`,
          HttpStatus.BAD_REQUEST,
        );
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
    {
      name,
      artistId,
      albumId,
      duration,
    }: {
      name?: Track['name'];
      artistId?: Track['artist']['id'] | null;
      albumId?: Track['album']['id'] | null;
      duration?: Track['duration'];
    },
  ): Promise<TrackResponse> {
    if (!validateUuid(trackId)) {
      throw new HttpException('Track id is invalid', HttpStatus.BAD_REQUEST);
    }

    const hasName = name !== undefined;

    const isValidName =
      (typeof name === 'string' && name?.trim() !== '') || !hasName;

    if (!isValidName) {
      throw new HttpException('Invalid name', HttpStatus.BAD_REQUEST);
    }

    const hasArtistId = artistId !== undefined;

    const isValidArtistId =
      (typeof artistId === 'string' && artistId?.trim() !== '') ||
      artistId === null ||
      !hasArtistId;

    if (!isValidArtistId) {
      throw new HttpException('Invalid artist id', HttpStatus.BAD_REQUEST);
    }

    const hasAlbumId = albumId !== undefined;

    const isValidAlbumId =
      (typeof albumId === 'string' && albumId?.trim() !== '') ||
      albumId === null ||
      !hasAlbumId;

    if (!isValidAlbumId) {
      throw new HttpException('Invalid album id', HttpStatus.BAD_REQUEST);
    }

    const hasDuration = duration !== undefined;

    const isValidDuration =
      (typeof duration === 'number' && duration > 0) || !hasDuration;

    if (!isValidDuration) {
      throw new HttpException('Invalid duration', HttpStatus.BAD_REQUEST);
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

    if (hasAlbumId) {
      const album = this.albumRepository.findAlbumById(albumId);

      if (album === null) {
        throw new HttpException(
          `Album with id ${albumId} is not found`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const track = await this.trackRepository.findTrackById(trackId);

    if (track === null) {
      throw new HttpException(
        `Track with id ${trackId} is not found`,
        HttpStatus.NOT_FOUND,
      );
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
      throw new HttpException('Track id is invalid', HttpStatus.BAD_REQUEST);
    }

    const track = await this.trackRepository.findTrackById(trackId);

    if (track === null) {
      throw new HttpException(
        `Track with id ${trackId} is not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.trackRepository.removeTrack(trackId);
  }
}
