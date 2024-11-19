import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Artist } from './artist.entity';
import { Album } from './album.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column()
  name: string;

  @Column()
  duration: number;

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artist: Artist | null;

  @ManyToOne(() => Album, (album) => album.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'albumId' })
  album: Album | null;
}
