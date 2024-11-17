import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

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

  @Column({ type: 'bigint' })
  _createdAt: number = new Date().getTime();

  @Column({ type: 'bigint' })
  _updatedAt: number = new Date().getTime();

  get createdAt(): number {
    return Number(this._createdAt);
  }

  set createdAt(value: string | number) {
    this._createdAt = Number(value);
  }

  get updatedAt(): number {
    return Number(this._updatedAt);
  }

  set updatedAt(value: string | number) {
    this._updatedAt = Number(value);
  }
}
