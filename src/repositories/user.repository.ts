import { Injectable } from '@nestjs/common';

import { User } from '../entities/user.entity';

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
}
