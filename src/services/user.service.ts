import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import { validate as validateUuid } from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  #userToPartialUser({
    id,
    login,
    version,
    createdAt,
    updatedAt,
  }: User): Partial<User> {
    return {
      id,
      login,
      version,
      createdAt,
      updatedAt,
    };
  }

  async getUsers(): Promise<Partial<User>[]> {
    const users = await this.userRepository.getAllUsers();

    return users.map(this.#userToPartialUser);
  }

  async getUser(userId: string): Promise<Partial<User>> {
    if (!validateUuid(userId)) {
      throw new HttpException('User id is invalid', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findUserById(userId);

    if (user === null) {
      throw new HttpException(
        `User with id ${userId} is not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.#userToPartialUser(user);
  }

  async createUser({
    login,
    password,
  }: {
    login: string;
    password: string;
  }): Promise<Partial<User>> {
    const hasLogin = typeof login === 'string' && login?.trim() !== '';

    if (!hasLogin) {
      throw new HttpException('Invalid login', HttpStatus.BAD_REQUEST);
    }

    const hasPassword = typeof password === 'string' && password?.trim() !== '';

    if (!hasPassword) {
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.addUser(login, password);

    return this.#userToPartialUser(user);
  }

  async updateUserPassword(
    userId: string,
    {
      oldPassword,
      newPassword,
    }: {
      oldPassword: string;
      newPassword: string;
    },
  ): Promise<Partial<User>> {
    if (!validateUuid(userId)) {
      throw new HttpException('User id is invalid', HttpStatus.BAD_REQUEST);
    }

    const hasOldPassword =
      typeof oldPassword === 'string' && oldPassword?.trim() !== '';

    if (!hasOldPassword) {
      throw new HttpException('Invalid old password', HttpStatus.BAD_REQUEST);
    }

    const hasNewPassword =
      typeof newPassword === 'string' && newPassword?.trim() !== '';

    if (!hasNewPassword) {
      throw new HttpException('Invalid new password', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findUserById(userId);

    if (user === null) {
      throw new HttpException(
        `User with id ${userId} is not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (user.password !== oldPassword) {
      throw new HttpException(
        'Old password is incorrect',
        HttpStatus.FORBIDDEN,
      );
    }

    const updatedUser = await this.userRepository.updateUser(userId, {
      ...user,
      password: newPassword,
    });

    return this.#userToPartialUser(updatedUser);
  }

  async removeUser(userId: string): Promise<void> {
    if (!validateUuid(userId)) {
      throw new HttpException('User id is invalid', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findUserById(userId);

    if (user === null) {
      throw new HttpException(
        `User with id ${userId} is not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.userRepository.removeUser(userId);
  }
}
