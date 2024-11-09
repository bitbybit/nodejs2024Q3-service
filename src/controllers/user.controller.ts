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
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getUsers(): Promise<Partial<User>[]> {
    return await this.userService.getUsers();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('id') id: string): Promise<Partial<User>> {
    return await this.userService.getUser(id);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() payload: { login: string; password: string },
  ): Promise<Partial<User>> {
    return await this.userService.createUser(payload);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updateUserPassword(
    @Param('id') id: string,
    @Body() payload: { oldPassword: string; newPassword: string },
  ): Promise<Partial<User>> {
    return await this.userService.updateUserPassword(id, payload);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeUser(@Param('id') id: string): Promise<void> {
    await this.userService.removeUser(id);
  }
}
