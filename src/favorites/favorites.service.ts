import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate as validateUuid } from 'uuid';

import { Track } from '../entities/track.entity';
import { Album } from '../entities/album.entity';
import { Artist } from '../entities/artist.entity';

import { FavoritesRepository } from '../repositories/favorites.repository';
import { TrackRepository } from '../repositories/track.repository';
import { AlbumRepository } from '../repositories/album.repository';
import { ArtistRepository } from '../repositories/artist.repository';

import { artistToArtistResponse } from '../artist/artist.service';
import { albumToAlbumResponse } from '../album/album.service';
import { trackToTrackResponse } from '../track/track.service';

import {
  FavoritesAddedResponseDto,
  FavoritesResponseDto,
} from './favorites.dto';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly trackRepository: TrackRepository,
    private readonly albumRepository: AlbumRepository,
    private readonly artistRepository: ArtistRepository,
  ) {}

  async getFavorites(): Promise<FavoritesResponseDto> {
    const artists = await this.favoritesRepository.getArtists();
    const albums = await this.favoritesRepository.getAlbums();
    const tracks = await this.favoritesRepository.getTracks();

    return {
      artists: artists.map(artistToArtistResponse),
      albums: albums.map(albumToAlbumResponse),
      tracks: tracks.map(trackToTrackResponse),
    };
  }

  async addFavoriteTrack(
    trackId: Track['id'],
  ): Promise<FavoritesAddedResponseDto> {
    if (!validateUuid(trackId)) {
      throw new HttpException('Track id is invalid', HttpStatus.BAD_REQUEST);
    }

    const track = await this.trackRepository.findTrackById(trackId);

    if (track === null) {
      throw new HttpException(
        `Track with id ${trackId} is not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.favoritesRepository.addFavoriteTrack(trackId);

    return {
      message: `Track with id ${trackId} is added to favorites`,
    };
  }

  async removeFavoriteTrack(trackId: Track['id']): Promise<void> {
    if (!validateUuid(trackId)) {
      throw new HttpException('Track id is invalid', HttpStatus.BAD_REQUEST);
    }

    const track = await this.trackRepository.findTrackById(trackId);

    if (track === null) {
      throw new HttpException(
        `Track with id ${trackId} is not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favoriteTrack = await this.favoritesRepository.findFavoriteTrackById(
      trackId,
    );

    if (favoriteTrack === null) {
      throw new HttpException(
        `Favorite track with id ${trackId} is not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.favoritesRepository.removeFavoriteTrack(trackId);
  }

  async addFavoriteAlbum(
    albumId: Album['id'],
  ): Promise<FavoritesAddedResponseDto> {
    if (!validateUuid(albumId)) {
      throw new HttpException('Album id is invalid', HttpStatus.BAD_REQUEST);
    }

    const album = await this.albumRepository.findAlbumById(albumId);

    if (album === null) {
      throw new HttpException(
        `Album with id ${albumId} is not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.favoritesRepository.addFavoriteAlbum(albumId);

    return {
      message: `Album with id ${albumId} is added to favorites`,
    };
  }

  async removeFavoriteAlbum(albumId: Album['id']): Promise<void> {
    if (!validateUuid(albumId)) {
      throw new HttpException('Album id is invalid', HttpStatus.BAD_REQUEST);
    }

    const album = await this.albumRepository.findAlbumById(albumId);

    if (album === null) {
      throw new HttpException(
        `Album with id ${albumId} is not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favoriteAlbum = await this.favoritesRepository.findFavoriteAlbumById(
      albumId,
    );

    if (favoriteAlbum === null) {
      throw new HttpException(
        `Favorite album with id ${albumId} is not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.favoritesRepository.removeFavoriteAlbum(albumId);
  }

  async addFavoriteArtist(
    artistId: Artist['id'],
  ): Promise<FavoritesAddedResponseDto> {
    if (!validateUuid(artistId)) {
      throw new HttpException('Artist id is invalid', HttpStatus.BAD_REQUEST);
    }

    const artist = await this.artistRepository.findArtistById(artistId);

    if (artist === null) {
      throw new HttpException(
        `Artist with id ${artistId} is not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.favoritesRepository.addFavoriteArtist(artistId);

    return {
      message: `Artist with id ${artistId} is added to favorites`,
    };
  }

  async removeFavoriteArtist(artistId: Artist['id']): Promise<void> {
    if (!validateUuid(artistId)) {
      throw new HttpException('Artist id is invalid', HttpStatus.BAD_REQUEST);
    }

    const artist = await this.artistRepository.findArtistById(artistId);

    if (artist === null) {
      throw new HttpException(
        `Artist with id ${artistId} is not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favoriteArtist =
      await this.favoritesRepository.findFavoriteArtistById(artistId);

    if (favoriteArtist === null) {
      throw new HttpException(
        `Favorite artist with id ${artistId} is not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.favoritesRepository.removeFavoriteArtist(artistId);
  }
}
