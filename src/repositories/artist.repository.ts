import { Artist } from '../entities/artist.entity';
import { UserRepository } from './user.repository';
import { TrackRepository } from './track.repository';
import { AlbumRepository } from './album.repository';

export class ArtistRepository {
  private artists: Artist[] = [];

  constructor(
    private readonly userRepository: UserRepository,
    private readonly trackRepository: TrackRepository,
    private readonly albumRepository: AlbumRepository,
  ) {}

  async getAllArtists(): Promise<Artist[]> {
    return this.artists;
  }

  async findArtistById(artistId: Artist['id']): Promise<Artist | null> {
    return this.artists.find((artist) => artist.id === artistId) || null;
  }

  async addArtist(
    name: Artist['name'],
    grammy: Artist['grammy'],
  ): Promise<Artist> {
    const artist = new Artist();

    artist.name = name;
    artist.grammy = grammy;
    artist.albums = [];
    artist.tracks = [];

    this.artists.push(artist);

    return artist;
  }

  async updateArtist(
    artistId: Artist['id'],
    data: Partial<Artist>,
  ): Promise<Artist | null> {
    const artist = this.artists.find((artist) => artist.id === artistId);

    if (artist !== undefined) {
      Object.assign(artist, data);

      return artist;
    }

    return null;
  }

  async removeArtist(artistId: Artist['id']): Promise<void> {
    await this.userRepository.removeDeletedArtistFromFavorites(artistId);
    await this.trackRepository.removeArtistReference(artistId);
    await this.albumRepository.removeArtistReference(artistId);

    this.artists = this.artists.filter((artist) => artist.id !== artistId);
  }
}
