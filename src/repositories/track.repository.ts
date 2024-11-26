import { DataSource, Repository } from 'typeorm';
import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { Album } from '../entities/album.entity';
import { Artist } from '../entities/artist.entity';
import { Track } from '../entities/track.entity';

import { AlbumRepository } from './album.repository';
import { ArtistRepository } from './artist.repository';
import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class TrackRepository extends Repository<Track> {
  constructor(
    private readonly dataSource: DataSource,

    @Inject(forwardRef(() => AlbumRepository))
    private readonly albumRepository: AlbumRepository,

    @Inject(forwardRef(() => ArtistRepository))
    private readonly artistRepository: ArtistRepository,

    @Inject(forwardRef(() => FavoritesRepository))
    private readonly favoritesRepository: FavoritesRepository,
  ) {
    super(Track, dataSource.createEntityManager());
  }

  async getAllTracks(): Promise<Track[]> {
    return await this.find({ relations: ['artist', 'album'] });
  }

  async findTrackById(trackId: Track['id']): Promise<Track | null> {
    return await this.findOne({
      where: { id: trackId },
      relations: ['artist', 'album'],
    });
  }

  async addTrack(
    name: Track['name'],
    duration: Track['duration'],
    artistId: Track['artist']['id'] | null,
    albumId: Track['album']['id'] | null,
  ): Promise<Track> {
    const artist =
      artistId !== null
        ? await this.artistRepository.findArtistById(artistId)
        : null;

    const album =
      albumId !== null
        ? await this.albumRepository.findAlbumById(albumId)
        : null;

    const track = this.create({
      name,
      duration,
      artist,
      album,
    });

    return await this.save(track);
  }

  async updateTrack(
    trackId: Track['id'],
    data: Partial<Track>,
  ): Promise<Track | null> {
    const track = await this.findOne({ where: { id: trackId } });

    if (track === null) {
      return null;
    }

    Object.assign(track, data);

    return await this.save(track);
  }

  async removeTrack(trackId: Track['id']): Promise<void> {
    await this.favoritesRepository.removeDeletedTrackFromFavorites(trackId);

    await this.delete({ id: trackId });
  }

  async removeArtistReference(artistId: Artist['id']): Promise<void> {
    const tracks = await this.find({ where: { artist: { id: artistId } } });

    for (const track of tracks) {
      track.artist = null;

      await this.save(track);
    }
  }

  async removeAlbumReference(albumId: Album['id']): Promise<void> {
    const tracks = await this.find({ where: { album: { id: albumId } } });

    for (const track of tracks) {
      track.album = null;

      await this.save(track);
    }
  }
}
