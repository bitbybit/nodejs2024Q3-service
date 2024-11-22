import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { Album } from '../entities/album.entity';
import { Artist } from '../entities/artist.entity';

import { TrackRepository } from './track.repository';
import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class AlbumRepository {
  private albums: Album[] = [];

  constructor(
    @Inject(forwardRef(() => TrackRepository))
    private readonly trackRepository: TrackRepository,

    @Inject(forwardRef(() => FavoritesRepository))
    private readonly favoritesRepository: FavoritesRepository,
  ) {}

  async getAllAlbums(): Promise<Album[]> {
    return this.albums;
  }

  async findAlbumById(id: Album['id']): Promise<Album | null> {
    return this.albums.find((album) => album.id === id) || null;
  }

  async addAlbum(
    name: Album['name'],
    year: Album['year'],
    artistId: Artist['id'],
  ): Promise<Album> {
    const album = new Album();

    album.name = name;
    album.year = year;
    album.artist = artistId ? ({ id: artistId } as Artist) : null;
    album.tracks = [];

    this.albums.push(album);

    return album;
  }

  async updateAlbum(
    albumId: Album['id'],
    data: Partial<Album>,
  ): Promise<Album | null> {
    const album = this.albums.find((album) => album.id === albumId);

    if (album !== undefined) {
      Object.assign(album, data);

      return album;
    }

    return null;
  }

  async removeAlbum(albumId: Album['id']): Promise<void> {
    await this.favoritesRepository.removeDeletedAlbumFromFavorites(albumId);
    await this.trackRepository.removeAlbumReference(albumId);

    this.albums = this.albums.filter((album) => album.id !== albumId);
  }

  async removeArtistReference(artistId: Artist['id']): Promise<void> {
    this.albums.forEach((album) => {
      if (album.artist?.id === artistId) {
        album.artist = null;
      }
    });
  }
}
