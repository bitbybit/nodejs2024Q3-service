import { DataSource, Repository } from 'typeorm';
import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { Artist } from '../entities/artist.entity';

import { AlbumRepository } from './album.repository';
import { FavoritesRepository } from './favorites.repository';
import { TrackRepository } from './track.repository';

@Injectable()
export class ArtistRepository extends Repository<Artist> {
  constructor(
    private readonly dataSource: DataSource,

    @Inject(forwardRef(() => AlbumRepository))
    private readonly albumRepository: AlbumRepository,

    @Inject(forwardRef(() => FavoritesRepository))
    private readonly favoritesRepository: FavoritesRepository,

    @Inject(forwardRef(() => TrackRepository))
    private readonly trackRepository: TrackRepository,
  ) {
    super(Artist, dataSource.createEntityManager());
  }

  async getAllArtists(): Promise<Artist[]> {
    return this.find({ relations: ['albums', 'tracks'] });
  }

  async findArtistById(artistId: Artist['id']): Promise<Artist | null> {
    return this.findOne({
      where: { id: artistId },
      relations: ['albums', 'tracks'],
    });
  }

  async addArtist(
    name: Artist['name'],
    grammy: Artist['grammy'],
  ): Promise<Artist> {
    const artist = this.create({ name, grammy });

    return this.save(artist);
  }

  async updateArtist(
    artistId: Artist['id'],
    data: Partial<Artist>,
  ): Promise<Artist | null> {
    const artist = await this.findOneBy({ id: artistId });

    if (artist === null) {
      return null;
    }

    Object.assign(artist, data);

    return this.save(artist);
  }

  async removeArtist(artistId: Artist['id']): Promise<void> {
    await this.favoritesRepository.removeDeletedArtistFromFavorites(artistId);
    await this.trackRepository.removeArtistReference(artistId);
    await this.albumRepository.removeArtistReference(artistId);

    await this.delete(artistId);
  }
}
