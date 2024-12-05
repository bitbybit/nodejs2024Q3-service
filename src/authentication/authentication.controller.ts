import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RefreshGuard } from '../authorization/refresh.guard';

import { AuthenticationService } from './authentication.service';

import {
  AuthenticationLoginDto,
  AuthenticationLoginResponseDto,
  AuthenticationSignupDto,
  AuthenticationSignupResponseDto,
  AuthenticationRefreshTokenDto,
  AuthenticationRefreshTokenResponseDto,
} from './authentication.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Signup a user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful signup',
    type: AuthenticationSignupResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflict. Login already exists',
  })
  async signup(
    @Body() payload: AuthenticationSignupDto,
  ): Promise<AuthenticationSignupResponseDto> {
    return await this.authenticationService.signup(payload);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logins a user and returns a JWT-token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful login',
    type: AuthenticationLoginResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Incorrect login or password',
  })
  async login(
    @Body() payload: AuthenticationLoginDto,
  ): Promise<AuthenticationLoginResponseDto> {
    return await this.authenticationService.login(payload);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshGuard)
  @ApiOperation({ summary: 'Get a new pair of Access token and Refresh token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: AuthenticationRefreshTokenResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Refresh token is missing',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Refresh token is invalid or expired',
  })
  async refreshToken(
    @Body() payload: AuthenticationRefreshTokenDto,
  ): Promise<AuthenticationRefreshTokenResponseDto> {
    return await this.authenticationService.refreshToken(payload);
  }
}
