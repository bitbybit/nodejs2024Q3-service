import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Artist } from './artist.entity';
import { Album } from './album.entity';
import { Track } from './track.entity';

@Entity()
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column('simple-array')
  artists: Artist[];

  @Column('simple-array')
  albums: Album[];

  @Column('simple-array')
  tracks: Track[];
}
