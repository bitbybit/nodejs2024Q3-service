import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validate as validateUuid } from 'uuid';

import { AuthService } from '../auth/auth.service';

import { User } from '../entities/user.entity';

import { UserRepository } from '../repositories/user.repository';

import {
  UserCreateDto,
  UserResponseDto,
  UserUpdatePasswordDto,
} from './user.dto';

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
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  async getUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.getAllUsers();

    return users.map(userToUserResponse);
  }

  async getUser(userId: User['id']): Promise<UserResponseDto> {
    if (!validateUuid(userId)) {
      throw new BadRequestException('User id is invalid');
    }

    const user = await this.userRepository.findUserById(userId);

    if (user === null) {
      throw new NotFoundException(`User with id ${userId} is not found`);
    }

    return userToUserResponse(user);
  }

  async createUser({
    login,
    password,
  }: UserCreateDto): Promise<UserResponseDto> {
    const hasLogin = typeof login === 'string' && login?.trim() !== '';

    if (!hasLogin) {
      throw new BadRequestException('Invalid login');
    }

    const hasPassword = typeof password === 'string' && password?.trim() !== '';

    if (!hasPassword) {
      throw new BadRequestException('Invalid password');
    }

    const user = await this.userRepository.addUser(login, password);

    return userToUserResponse(user);
  }

  async updateUserPassword(
    userId: User['id'],
    { oldPassword, newPassword }: UserUpdatePasswordDto,
  ): Promise<UserResponseDto> {
    if (!validateUuid(userId)) {
      throw new BadRequestException('User id is invalid');
    }

    const isValidOldPassword =
      typeof oldPassword === 'string' && oldPassword?.trim() !== '';

    if (!isValidOldPassword) {
      throw new BadRequestException('Invalid old password');
    }

    const isValidNewPassword =
      typeof newPassword === 'string' && newPassword?.trim() !== '';

    if (!isValidNewPassword) {
      throw new BadRequestException('Invalid new password');
    }

    const user = await this.userRepository.findUserById(userId);

    if (user === null) {
      throw new NotFoundException(`User with id ${userId} is not found`);
    }

    const isCorrectOldPassword = await this.authService.verifyPassword(
      oldPassword,
      user.password,
    );

    if (!isCorrectOldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const updatedUser = await this.userRepository.updateUser(userId, {
      ...user,
      password: newPassword,
    });

    return userToUserResponse(updatedUser);
  }

  async removeUser(userId: User['id']): Promise<void> {
    if (!validateUuid(userId)) {
      throw new BadRequestException('User id is invalid');
    }

    const user = await this.userRepository.findUserById(userId);

    if (user === null) {
      throw new NotFoundException(`User with id ${userId} is not found`);
    }

    await this.userRepository.removeUser(userId);
  }
}
