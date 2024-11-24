import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { AuthorizationService } from '../authorization/authorization.service';

import { UserRepository } from '../repositories/user.repository';

import {
  AuthenticationLoginDto,
  AuthenticationLoginResponseDto,
  AuthenticationSignupDto,
  AuthenticationSignupResponseDto,
  AuthenticationRefreshTokenDto,
  AuthenticationRefreshTokenResponseDto,
} from './authentication.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly userRepository: UserRepository,
  ) {}

  async signup({
    login,
    password,
  }: AuthenticationSignupDto): Promise<AuthenticationSignupResponseDto> {
    const hasLogin = typeof login === 'string' && login?.trim() !== '';

    if (!hasLogin) {
      throw new BadRequestException('Invalid login');
    }

    const hasPassword = typeof password === 'string' && password?.trim() !== '';

    if (!hasPassword) {
      throw new BadRequestException('Invalid password');
    }

    const user = await this.userRepository.findUserByLogin(login);

    if (user !== null) {
      throw new ConflictException('Login already exists');
    }

    const { id } = await this.userRepository.addUser(login, password);

    return {
      id,
      login,
    };
  }

  async login({
    login,
    password,
  }: AuthenticationLoginDto): Promise<AuthenticationLoginResponseDto> {
    const hasLogin = typeof login === 'string' && login?.trim() !== '';

    if (!hasLogin) {
      throw new BadRequestException('Invalid login');
    }

    const hasPassword = typeof password === 'string' && password?.trim() !== '';

    if (!hasPassword) {
      throw new BadRequestException('Invalid password');
    }

    const user = await this.userRepository.findUserByLogin(login);

    if (user === null) {
      throw new ForbiddenException('No user with such login');
    }

    const isCorrectPassword = await this.authorizationService.verifyPassword(
      password,
      user.password,
    );

    if (!isCorrectPassword) {
      throw new ForbiddenException('Password does not match');
    }

    const accessToken = await this.authorizationService.generateAccessToken(
      user.login,
      user.id,
    );

    const refreshToken = await this.authorizationService.generateRefreshToken(
      user.login,
      user.id,
    );

    await this.userRepository.updateUser(user.id, {
      refreshToken,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken({
    refreshToken,
  }: AuthenticationRefreshTokenDto): Promise<AuthenticationRefreshTokenResponseDto> {
    const user = await this.userRepository.findUserByRefreshToken(refreshToken);

    if (user === null) {
      throw new ForbiddenException('Refresh token is invalid');
    }

    const newAccessToken = await this.authorizationService.generateAccessToken(
      user.login,
      user.id,
    );

    const newRefreshToken =
      await this.authorizationService.generateRefreshToken(user.login, user.id);

    await this.userRepository.updateUser(user.id, {
      refreshToken: newRefreshToken,
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
