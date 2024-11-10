import { Track } from '../entities/track.entity';
import { Artist } from '../entities/artist.entity';
import { Album } from '../entities/album.entity';
import { UserRepository } from './user.repository';

export class TrackRepository {
  private tracks: Track[] = [];

  constructor(private readonly userRepository: UserRepository) {}

  async getAllTracks(): Promise<Track[]> {
    return this.tracks;
  }

  async findTrackById(trackId: Track['id']): Promise<Track | null> {
    return this.tracks.find((track) => track.id === trackId) || null;
  }

  async addTrack(
    name: Track['name'],
    duration: Track['duration'],
    artistId: Track['artist']['id'] | null,
    albumId: Track['album']['id'] | null,
  ): Promise<Track> {
    const track = new Track();

    track.name = name;
    track.duration = duration;

    track.artist = artistId ? ({ id: artistId } as Artist) : null;
    track.album = albumId ? ({ id: albumId } as Album) : null;

    this.tracks.push(track);

    return track;
  }

  async updateTrack(
    trackId: Track['id'],
    data: Partial<Track>,
  ): Promise<Track | null> {
    const track = this.tracks.find((track) => track.id === trackId);

    if (track !== undefined) {
      Object.assign(track, data);

      return track;
    }

    return null;
  }

  async removeTrack(trackId: Track['id']): Promise<void> {
    await this.userRepository.removeDeletedTrackFromFavorites(trackId);

    this.tracks = this.tracks.filter((track) => track.id !== trackId);
  }

  async removeArtistReference(artistId: Artist['id']): Promise<void> {
    this.tracks.forEach((track) => {
      if (track.artist?.id === artistId) {
        track.artist = null;
      }
    });
  }

  async removeAlbumReference(albumId: Album['id']): Promise<void> {
    this.tracks.forEach((track) => {
      if (track.album?.id === albumId) {
        track.album = null;
      }
    });
  }
}
