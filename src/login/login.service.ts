import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { AuthService } from '../auth/auth.service';

import { UserRepository } from '../repositories/user.repository';

import {
  LoginDto,
  LoginResponseDto,
  LoginSignupDto,
  LoginSignupResponseDto,
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
      throw new HttpException('Invalid login', HttpStatus.BAD_REQUEST);
    }

    const hasPassword = typeof password === 'string' && password?.trim() !== '';

    if (!hasPassword) {
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findUserByLogin(login);

    if (user !== null) {
      throw new HttpException('Login already exists', HttpStatus.CONFLICT);
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
      throw new HttpException('Invalid login', HttpStatus.BAD_REQUEST);
    }

    const hasPassword = typeof password === 'string' && password?.trim() !== '';

    if (!hasPassword) {
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findUserByLogin(login);

    if (user === null) {
      throw new HttpException('No user with such login', HttpStatus.FORBIDDEN);
    }

    const isCorrectPassword = this.authService.verifyPassword(
      password,
      user.password,
    );

    if (!isCorrectPassword) {
      throw new HttpException('Password does not match', HttpStatus.FORBIDDEN);
    }

    const accessToken = this.authService.generateToken(user.login, user.id);

    return {
      accessToken,
    };
  }
}
