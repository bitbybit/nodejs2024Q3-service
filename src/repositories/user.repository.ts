import { User } from '../entities/user.entity';
import { Artist } from '../entities/artist.entity';
import { Album } from '../entities/album.entity';
import { Track } from '../entities/track.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private users: User[] = [];

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async findUserById(userId: User['id']): Promise<User | null> {
    return this.users.find((user) => user.id === userId) || null;
  }

  async addUser(
    login: User['login'],
    password: User['password'],
  ): Promise<User> {
    const user = new User();

    user.login = login;
    user.password = password;
    user.version = 1;
    user.favoriteArtists = [];
    user.favoriteAlbums = [];
    user.favoriteTracks = [];

    this.users.push(user);

    return user;
  }

  async updateUser(
    userId: User['id'],
    data: Partial<User>,
  ): Promise<User | null> {
    const user = this.users.find((user) => user.id === userId);

    if (user !== undefined) {
      Object.assign(user, data);

      user.version += 1;
      user.updatedAt = new Date().getTime();

      return user;
    }

    return null;
  }

  async removeUser(userId: User['id']): Promise<void> {
    this.users = this.users.filter((user) => user.id !== userId);
  }

  async addFavoriteArtist(
    userId: User['id'],
    artistId: Artist['id'],
  ): Promise<void> {
    const user = this.users.find((user) => user.id === userId);

    if (
      user !== undefined &&
      !user.favoriteArtists.some((artist) => artist.id === artistId)
    ) {
      const artist = { id: artistId } as Artist;

      user.favoriteArtists.push(artist);
    }
  }

  async removeFavoriteArtist(
    userId: User['id'],
    artistId: Artist['id'],
  ): Promise<void> {
    const user = this.users.find((user) => user.id === userId);

    if (user !== undefined) {
      user.favoriteArtists = user.favoriteArtists.filter(
        (artist) => artist.id !== artistId,
      );
    }
  }

  async removeDeletedArtistFromFavorites(
    artistId: Artist['id'],
  ): Promise<void> {
    this.users.forEach((user) => {
      user.favoriteArtists = user.favoriteArtists.filter(
        (artist) => artist.id !== artistId,
      );
    });
  }

  async addFavoriteAlbum(
    userId: User['id'],
    albumId: Album['id'],
  ): Promise<void> {
    const user = this.users.find((user) => user.id === userId);

    if (
      user !== undefined &&
      !user.favoriteAlbums.some((album) => album.id === albumId)
    ) {
      const album = { id: albumId } as Album;
      user.favoriteAlbums.push(album);
    }
  }

  async removeFavoriteAlbum(
    userId: User['id'],
    albumId: Album['id'],
  ): Promise<void> {
    const user = this.users.find((user) => user.id === userId);

    if (user !== undefined) {
      user.favoriteAlbums = user.favoriteAlbums.filter(
        (album) => album.id !== albumId,
      );
    }
  }

  async removeDeletedAlbumFromFavorites(albumId: Album['id']): Promise<void> {
    this.users.forEach((user) => {
      user.favoriteAlbums = user.favoriteAlbums.filter(
        (album) => album.id !== albumId,
      );
    });
  }

  async addFavoriteTrack(
    userId: User['id'],
    trackId: Track['id'],
  ): Promise<void> {
    const user = this.users.find((user) => user.id === userId);

    if (
      user !== undefined &&
      !user.favoriteTracks.some((track) => track.id === trackId)
    ) {
      const track = { id: trackId } as Track;
      user.favoriteTracks.push(track);
    }
  }

  async removeFavoriteTrack(
    userId: User['id'],
    trackId: Track['id'],
  ): Promise<void> {
    const user = this.users.find((user) => user.id === userId);

    if (user !== undefined) {
      user.favoriteTracks = user.favoriteTracks.filter(
        (track) => track.id !== trackId,
      );
    }
  }

  async removeDeletedTrackFromFavorites(trackId: Track['id']): Promise<void> {
    this.users.forEach((user) => {
      user.favoriteTracks = user.favoriteTracks.filter(
        (track) => track.id !== trackId,
      );
    });
  }
}
