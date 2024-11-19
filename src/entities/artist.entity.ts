import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Album } from './album.entity';
import { Track } from './track.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column()
  name: string;

  @Column({ default: false })
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist, {
    cascade: true,
    nullable: true,
  })
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artist, {
    cascade: true,
    nullable: true,
  })
  tracks: Track[];
}
