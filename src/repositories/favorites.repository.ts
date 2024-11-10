import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { Artist } from '../entities/artist.entity';
import { Album } from '../entities/album.entity';
import { Track } from '../entities/track.entity';

import { ArtistRepository } from './artist.repository';
import { AlbumRepository } from './album.repository';
import { TrackRepository } from './track.repository';

@Injectable()
export class FavoritesRepository {
  public artists: Artist[] = [];
  public albums: Album[] = [];
  public tracks: Track[] = [];

  constructor(
    @Inject(forwardRef(() => ArtistRepository))
    private readonly artistRepository: ArtistRepository,

    @Inject(forwardRef(() => AlbumRepository))
    private readonly albumRepository: AlbumRepository,

    @Inject(forwardRef(() => TrackRepository))
    private readonly trackRepository: TrackRepository,
  ) {}

  async findFavoriteArtistById(artistId: Artist['id']): Promise<Artist | null> {
    return this.artists.find(({ id }) => id === artistId) || null;
  }

  async addFavoriteArtist(artistId: Artist['id']): Promise<void> {
    if (!this.artists.some(({ id }) => id === artistId)) {
      const artist = await this.artistRepository.findArtistById(artistId);

      this.artists.push(artist);
    }
  }

  async removeFavoriteArtist(artistId: Artist['id']): Promise<void> {
    this.artists = this.artists.filter(({ id }) => id !== artistId);
  }

  async removeDeletedArtistFromFavorites(
    artistId: Artist['id'],
  ): Promise<void> {
    this.artists = this.artists.filter(({ id }) => id !== artistId);
  }

  async findFavoriteAlbumById(albumId: Album['id']): Promise<Album | null> {
    return this.albums.find(({ id }) => id === albumId) || null;
  }

  async addFavoriteAlbum(albumId: Album['id']): Promise<void> {
    if (!this.albums.some(({ id }) => id === albumId)) {
      const album = await this.albumRepository.findAlbumById(albumId);

      this.albums.push(album);
    }
  }

  async removeFavoriteAlbum(albumId: Album['id']): Promise<void> {
    this.albums = this.albums.filter(({ id }) => id !== albumId);
  }

  async removeDeletedAlbumFromFavorites(albumId: Album['id']): Promise<void> {
    this.albums = this.albums.filter(({ id }) => id !== albumId);
  }

  async findFavoriteTrackById(trackId: Track['id']): Promise<Track | null> {
    return this.tracks.find(({ id }) => id === trackId) || null;
  }

  async addFavoriteTrack(trackId: Track['id']): Promise<void> {
    if (!this.tracks.some(({ id }) => id === trackId)) {
      const track = await this.trackRepository.findTrackById(trackId);

      this.tracks.push(track);
    }
  }

  async removeFavoriteTrack(trackId: Track['id']): Promise<void> {
    this.tracks = this.tracks.filter(({ id }) => id !== trackId);
  }

  async removeDeletedTrackFromFavorites(trackId: Track['id']): Promise<void> {
    this.tracks = this.tracks.filter(({ id }) => id !== trackId);
  }
}
