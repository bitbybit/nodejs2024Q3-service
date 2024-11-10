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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { User } from '../entities/user.entity';

import { UserService } from '../services/user.service';

import {
  UserCreateDto,
  UserResponseDto,
  UserUpdatePasswordDto,
} from '../dtos/user.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [UserResponseDto],
  })
  async getUsers(): Promise<UserResponseDto[]> {
    return await this.userService.getUsers();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get single user by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResponseDto,
  })
  async getUser(@Param('id') id: User['id']): Promise<UserResponseDto> {
    return await this.userService.getUser(id);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserResponseDto,
  })
  async createUser(@Body() payload: UserCreateDto): Promise<UserResponseDto> {
    return await this.userService.createUser(payload);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update a user's password" })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResponseDto,
  })
  async updateUserPassword(
    @Param('id') id: User['id'],
    @Body()
    payload: UserUpdatePasswordDto,
  ): Promise<UserResponseDto> {
    return await this.userService.updateUserPassword(id, payload);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async removeUser(@Param('id') id: User['id']): Promise<void> {
    await this.userService.removeUser(id);
  }
}
