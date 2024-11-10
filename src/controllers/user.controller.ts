import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { User } from '../entities/user.entity';

import { type UserResponse, UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getUsers(): Promise<UserResponse[]> {
    return await this.userService.getUsers();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('id') id: User['id']): Promise<UserResponse> {
    return await this.userService.getUser(id);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() payload: { login: User['login']; password: User['password'] },
  ): Promise<UserResponse> {
    return await this.userService.createUser(payload);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updateUserPassword(
    @Param('id') id: User['id'],
    @Body()
    payload: { oldPassword: User['password']; newPassword: User['password'] },
  ): Promise<UserResponse> {
    return await this.userService.updateUserPassword(id, payload);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeUser(@Param('id') id: User['id']): Promise<void> {
    await this.userService.removeUser(id);
  }
}
