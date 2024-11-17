import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getAllUsers(): Promise<User[]> {
    return await this.find();
  }

  async findUserById(userId: User['id']): Promise<User | null> {
    return await this.findOne({ where: { id: userId } });
  }

  async addUser(
    login: User['login'],
    password: User['password'],
  ): Promise<User> {
    const user = this.create({
      login,
      password,
      version: 1,
    });

    return await this.save(user);
  }

  async updateUser(
    userId: User['id'],
    data: Partial<User>,
  ): Promise<User | null> {
    const user = await this.findOne({ where: { id: userId } });

    if (user === null) {
      return null;
    }

    Object.assign(user, data);

    user.version += 1;
    user.updatedAt = new Date().getTime();

    return await this.save(user);
  }

  async removeUser(userId: User['id']): Promise<void> {
    await this.delete({ id: userId });
  }
}
