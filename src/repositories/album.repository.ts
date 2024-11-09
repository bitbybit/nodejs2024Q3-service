import { Album } from '../entities/album.entity';
import { TrackRepository } from './track.repository';
import { UserRepository } from './user.repository';
import { Artist } from '../entities/artist.entity';

export class AlbumRepository {
  private albums: Album[] = [];

  constructor(
    private readonly userRepository: UserRepository,
    private readonly trackRepository: TrackRepository,
  ) {}

  async getAllAlbums(): Promise<Album[]> {
    return this.albums;
  }

  async findAlbumById(id: string): Promise<Album | null> {
    return this.albums.find((album) => album.id === id) || null;
  }

  async addAlbum(name: string, year: number, artistId: string): Promise<Album> {
    const album = new Album();

    album.name = name;
    album.year = year;
    album.artist = artistId ? ({ id: artistId } as Artist) : null;
    album.tracks = [];

    this.albums.push(album);

    return album;
  }

  async updateAlbum(
    albumId: string,
    data: Partial<Album>,
  ): Promise<Album | null> {
    const album = this.albums.find((album) => album.id === albumId);

    if (album !== undefined) {
      Object.assign(album, data);

      return album;
    }

    return null;
  }

  async removeAlbum(albumId: string): Promise<void> {
    await this.userRepository.removeDeletedAlbumFromFavorites(albumId);
    await this.trackRepository.removeAlbumReference(albumId);

    this.albums = this.albums.filter((album) => album.id !== albumId);
  }

  async removeArtistReference(artistId: string): Promise<void> {
    this.albums.forEach((album) => {
      if (album.artist?.id === artistId) {
        album.artist = null;
      }
    });
  }
}
