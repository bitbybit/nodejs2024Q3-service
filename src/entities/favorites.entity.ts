import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Album } from './album.entity';
import { Artist } from './artist.entity';
import { Track } from './track.entity';

@Entity()
export class Favorites {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Artist, { cascade: true })
  @JoinTable()
  artists: Artist[];

  @ManyToMany(() => Album, { cascade: true })
  @JoinTable()
  albums: Album[];

  @ManyToMany(() => Track, { cascade: true })
  @JoinTable()
  tracks: Track[];
}
