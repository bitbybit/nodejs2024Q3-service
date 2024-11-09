import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './artist.entity';
import { Album } from './album.entity';
import { Track } from './track.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column()
  login: string;

  @Column()
  password: string;

  @Column({ default: 1 })
  version: number;

  @CreateDateColumn()
  createdAt: number = new Date().getTime();

  @UpdateDateColumn()
  updatedAt: number = new Date().getTime();

  @ManyToMany(() => Artist, { cascade: true })
  @JoinTable({
    name: 'user_favorite_artists',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'artistId', referencedColumnName: 'id' },
  })
  favoriteArtists: Artist[];

  @ManyToMany(() => Album, { cascade: true })
  @JoinTable({
    name: 'user_favorite_albums',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'albumId', referencedColumnName: 'id' },
  })
  favoriteAlbums: Album[];

  @ManyToMany(() => Track, { cascade: true })
  @JoinTable({
    name: 'user_favorite_tracks',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'trackId', referencedColumnName: 'id' },
  })
  favoriteTracks: Track[];
}
