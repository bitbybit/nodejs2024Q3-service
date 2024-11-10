import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate as validateUuid } from 'uuid';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

export type UserResponse = {
  id: User['id'];
  login: User['login'];
  version: User['version'];
  createdAt: User['createdAt'];
  updatedAt: User['updatedAt'];
};

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  #userToUserResponse({
    id,
    login,
    version,
    createdAt,
    updatedAt,
  }: User): UserResponse {
    return {
      id,
      login,
      version,
      createdAt,
      updatedAt,
    };
  }

  async getUsers(): Promise<UserResponse[]> {
    const users = await this.userRepository.getAllUsers();

    return users.map(this.#userToUserResponse);
  }

  async getUser(userId: User['id']): Promise<UserResponse> {
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

    return this.#userToUserResponse(user);
  }

  async createUser({
    login,
    password,
  }: {
    login: User['login'];
    password: User['password'];
  }): Promise<UserResponse> {
    const hasLogin = typeof login === 'string' && login?.trim() !== '';

    if (!hasLogin) {
      throw new HttpException('Invalid login', HttpStatus.BAD_REQUEST);
    }

    const hasPassword = typeof password === 'string' && password?.trim() !== '';

    if (!hasPassword) {
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.addUser(login, password);

    return this.#userToUserResponse(user);
  }

  async updateUserPassword(
    userId: User['id'],
    {
      oldPassword,
      newPassword,
    }: {
      oldPassword: User['password'];
      newPassword: User['password'];
    },
  ): Promise<UserResponse> {
    if (!validateUuid(userId)) {
      throw new HttpException('User id is invalid', HttpStatus.BAD_REQUEST);
    }

    const isValidOldPassword =
      typeof oldPassword === 'string' && oldPassword?.trim() !== '';

    if (!isValidOldPassword) {
      throw new HttpException('Invalid old password', HttpStatus.BAD_REQUEST);
    }

    const isValidNewPassword =
      typeof newPassword === 'string' && newPassword?.trim() !== '';

    if (!isValidNewPassword) {
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

    return this.#userToUserResponse(updatedUser);
  }

  async removeUser(userId: User['id']): Promise<void> {
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
