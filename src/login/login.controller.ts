import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoginService } from './login.service';

import {
  LoginDto,
  LoginResponseDto,
  LoginSignupDto,
  LoginSignupResponseDto,
} from './login.dto';

@Controller('auth')
@ApiTags('Authentication')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Signup a user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful signup',
    type: LoginSignupResponseDto,
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
    @Body() payload: LoginSignupDto,
  ): Promise<LoginSignupResponseDto> {
    return await this.loginService.signup(payload);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logins a user and returns a JWT-token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful login',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Incorrect login or password',
  })
  async login(@Body() payload: LoginDto): Promise<LoginResponseDto> {
    return await this.loginService.login(payload);
  }
}
