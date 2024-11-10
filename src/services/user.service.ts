import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate as validateUuid } from 'uuid';

import { User } from '../entities/user.entity';

import { UserRepository } from '../repositories/user.repository';

import {
  UserCreateDto,
  UserResponseDto,
  UserUpdatePasswordDto,
} from '../dtos/user.dto';

export const userToUserResponse = ({
  id,
  login,
  version,
  createdAt,
  updatedAt,
}: User): UserResponseDto => {
  return {
    id,
    login,
    version,
    createdAt,
    updatedAt,
  };
};

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.getAllUsers();

    return users.map(userToUserResponse);
  }

  async getUser(userId: User['id']): Promise<UserResponseDto> {
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

    return userToUserResponse(user);
  }

  async createUser({
    login,
    password,
  }: UserCreateDto): Promise<UserResponseDto> {
    const hasLogin = typeof login === 'string' && login?.trim() !== '';

    if (!hasLogin) {
      throw new HttpException('Invalid login', HttpStatus.BAD_REQUEST);
    }

    const hasPassword = typeof password === 'string' && password?.trim() !== '';

    if (!hasPassword) {
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.addUser(login, password);

    return userToUserResponse(user);
  }

  async updateUserPassword(
    userId: User['id'],
    { oldPassword, newPassword }: UserUpdatePasswordDto,
  ): Promise<UserResponseDto> {
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

    return userToUserResponse(updatedUser);
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
