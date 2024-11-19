import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../entities/user.entity';

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  login: User['login'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: User['password'];
}

export class UserUpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  oldPassword: User['password'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  newPassword: User['password'];
}

export class UserResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  id: User['id'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  login: User['login'];

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  version: User['version'];

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  createdAt: User['createdAt'];

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  updatedAt: User['updatedAt'];
}
