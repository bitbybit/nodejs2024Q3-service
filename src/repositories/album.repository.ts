import { DataSource, Repository } from 'typeorm';
import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { Album } from '../entities/album.entity';
import { Artist } from '../entities/artist.entity';

import { ArtistRepository } from './artist.repository';
import { FavoritesRepository } from './favorites.repository';
import { TrackRepository } from './track.repository';

@Injectable()
export class AlbumRepository extends Repository<Album> {
  constructor(
    private readonly dataSource: DataSource,

    @Inject(forwardRef(() => ArtistRepository))
    private readonly artistRepository: ArtistRepository,

    @Inject(forwardRef(() => FavoritesRepository))
    private readonly favoritesRepository: FavoritesRepository,

    @Inject(forwardRef(() => TrackRepository))
    private readonly trackRepository: TrackRepository,
  ) {
    super(Album, dataSource.createEntityManager());
  }

  async getAllAlbums(): Promise<Album[]> {
    return this.find({ relations: ['artist'] });
  }

  async findAlbumById(id: Album['id']): Promise<Album | null> {
    return this.findOne({ where: { id }, relations: ['artist'] });
  }

  async addAlbum(
    name: Album['name'],
    year: Album['year'],
    artistId: Artist['id'],
  ): Promise<Album> {
    const artist =
      artistId !== null
        ? await this.artistRepository.findArtistById(artistId)
        : null;

    const album = this.create({ name, year, artist });

    return this.save(album);
  }

  async updateAlbum(
    albumId: Album['id'],
    data: Partial<Album>,
  ): Promise<Album | null> {
    const album = await this.findOneBy({ id: albumId });

    if (album === null) {
      return null;
    }

    Object.assign(album, data);

    return this.save(album);
  }

  async removeAlbum(albumId: Album['id']): Promise<void> {
    await this.favoritesRepository.removeDeletedAlbumFromFavorites(albumId);
    await this.trackRepository.removeAlbumReference(albumId);

    await this.delete(albumId);
  }

  async removeArtistReference(artistId: Artist['id']): Promise<void> {
    await this.createQueryBuilder()
      .update(Album)
      .set({ artist: null })
      .where('artistId = :artistId', { artistId })
      .execute();
  }
}
