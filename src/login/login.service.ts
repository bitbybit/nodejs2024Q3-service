import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { AuthService } from '../auth/auth.service';

import { UserRepository } from '../repositories/user.repository';

import {
  LoginDto,
  LoginResponseDto,
  LoginSignupDto,
  LoginSignupResponseDto,
  RefreshTokenDto,
  RefreshTokenResponseDto,
} from './login.dto';

@Injectable()
export class LoginService {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  async signup({
    login,
    password,
  }: LoginSignupDto): Promise<LoginSignupResponseDto> {
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

  async login({ login, password }: LoginDto): Promise<LoginResponseDto> {
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

    const isCorrectPassword = await this.authService.verifyPassword(
      password,
      user.password,
    );

    if (!isCorrectPassword) {
      throw new ForbiddenException('Password does not match');
    }

    const accessToken = await this.authService.generateAccessToken(
      user.login,
      user.id,
    );

    const refreshToken = await this.authService.generateRefreshToken(
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
  }: RefreshTokenDto): Promise<RefreshTokenResponseDto> {
    const user = await this.userRepository.findUserByRefreshToken(refreshToken);

    if (user === null) {
      throw new ForbiddenException('Refresh token is invalid');
    }

    const newAccessToken = await this.authService.generateAccessToken(
      user.login,
      user.id,
    );

    const newRefreshToken = await this.authService.generateRefreshToken(
      user.login,
      user.id,
    );

    await this.userRepository.updateUser(user.id, {
      refreshToken: newRefreshToken,
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
