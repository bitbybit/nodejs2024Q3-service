import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../entities/user.entity';

export class LoginSignupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  login: User['login'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: User['password'];
}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  login: User['login'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: User['password'];
}

export class LoginSignupResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  id: User['id'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  login: User['login'];
}

export class LoginResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  accessToken: string;
}
