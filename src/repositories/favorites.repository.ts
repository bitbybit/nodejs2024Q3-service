import { DataSource, Repository } from 'typeorm';
import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { Album } from '../entities/album.entity';
import { Artist } from '../entities/artist.entity';
import { Favorites } from '../entities/favorites.entity';
import { Track } from '../entities/track.entity';

import { AlbumRepository } from './album.repository';
import { ArtistRepository } from './artist.repository';
import { TrackRepository } from './track.repository';

@Injectable()
export class FavoritesRepository extends Repository<Favorites> {
  private readonly favoritesId = 1;

  constructor(
    private readonly dataSource: DataSource,

    @Inject(forwardRef(() => AlbumRepository))
    private readonly albumRepository: AlbumRepository,

    @Inject(forwardRef(() => ArtistRepository))
    private readonly artistRepository: ArtistRepository,

    @Inject(forwardRef(() => TrackRepository))
    private readonly trackRepository: TrackRepository,
  ) {
    super(Favorites, dataSource.createEntityManager());
  }

  private async getFavorites(): Promise<Favorites> {
    let favorites = await this.findOne({
      where: { id: this.favoritesId },
      relations: [
        'albums',
        'albums.artist',
        'artists',
        'tracks',
        'tracks.album',
        'tracks.artist',
      ],
    });

    if (favorites === null) {
      favorites = this.create({
        id: this.favoritesId,
        albums: [],
        artists: [],
        tracks: [],
      });

      await this.save(favorites);
    }

    return favorites;
  }

  async getArtists(): Promise<Artist[]> {
    const favorites = await this.getFavorites();

    return favorites.artists;
  }

  async getAlbums(): Promise<Album[]> {
    const favorites = await this.getFavorites();

    return favorites.albums;
  }

  async getTracks(): Promise<Track[]> {
    const favorites = await this.getFavorites();

    return favorites.tracks;
  }

  async findFavoriteArtistById(artistId: Artist['id']): Promise<Artist | null> {
    const favorites = await this.getFavorites();

    return favorites.artists.find(({ id }) => id === artistId);
  }

  async addFavoriteArtist(artistId: Artist['id']): Promise<void> {
    const artist = await this.artistRepository.findOne({
      where: { id: artistId },
    });

    if (artist === null) {
      return;
    }

    const favorites = await this.getFavorites();

    if (!favorites.artists.some(({ id }) => id === artistId)) {
      favorites.artists.push(artist);

      await this.save(favorites);
    }
  }

  async removeFavoriteArtist(artistId: Artist['id']): Promise<void> {
    const favorites = await this.getFavorites();

    favorites.artists = favorites.artists.filter(({ id }) => id !== artistId);

    await this.save(favorites);
  }

  async removeDeletedArtistFromFavorites(
    artistId: Artist['id'],
  ): Promise<void> {
    await this.removeFavoriteArtist(artistId);
  }

  async findFavoriteAlbumById(albumId: Album['id']): Promise<Album | null> {
    const favorites = await this.getFavorites();

    return favorites.albums.find(({ id }) => id === albumId);
  }

  async addFavoriteAlbum(albumId: Album['id']): Promise<void> {
    const album = await this.albumRepository.findOne({
      where: { id: albumId },
    });

    if (album === null) {
      return;
    }

    const favorites = await this.getFavorites();

    if (!favorites.albums.some(({ id }) => id === albumId)) {
      favorites.albums.push(album);

      await this.save(favorites);
    }
  }

  async removeFavoriteAlbum(albumId: Album['id']): Promise<void> {
    const favorites = await this.getFavorites();

    favorites.albums = favorites.albums.filter(({ id }) => id !== albumId);

    await this.save(favorites);
  }

  async removeDeletedAlbumFromFavorites(albumId: Album['id']): Promise<void> {
    await this.removeFavoriteAlbum(albumId);
  }

  async findFavoriteTrackById(trackId: Track['id']): Promise<Track | null> {
    const favorites = await this.getFavorites();

    return favorites.tracks.find(({ id }) => id === trackId);
  }

  async addFavoriteTrack(trackId: Track['id']): Promise<void> {
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
    });

    if (track === null) {
      return;
    }

    const favorites = await this.getFavorites();

    if (!favorites.tracks.some(({ id }) => id === trackId)) {
      favorites.tracks.push(track);

      await this.save(favorites);
    }
  }

  async removeFavoriteTrack(trackId: Track['id']): Promise<void> {
    const favorites = await this.getFavorites();

    favorites.tracks = favorites.tracks.filter(({ id }) => id !== trackId);

    await this.save(favorites);
  }

  async removeDeletedTrackFromFavorites(trackId: Track['id']): Promise<void> {
    await this.removeFavoriteTrack(trackId);
  }
}
