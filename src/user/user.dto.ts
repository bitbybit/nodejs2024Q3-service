import { ApiProperty } from '@nestjs/swagger';

import { User } from '../entities/user.entity';

export class UserCreateDto {
  @ApiProperty({ type: String })
  login: User['login'];

  @ApiProperty({ type: String })
  password: User['password'];
}

export class UserUpdatePasswordDto {
  @ApiProperty({ type: String })
  oldPassword: User['password'];

  @ApiProperty({ type: String })
  newPassword: User['password'];
}

export class UserResponseDto {
  @ApiProperty({ type: String })
  id: User['id'];

  @ApiProperty({ type: String })
  login: User['login'];

  @ApiProperty({ type: Number })
  version: User['version'];

  @ApiProperty({ type: Number })
  createdAt: User['createdAt'];

  @ApiProperty({ type: Number })
  updatedAt: User['updatedAt'];
}
