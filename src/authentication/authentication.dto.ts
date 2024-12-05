import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../entities/user.entity';

export class AuthenticationSignupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  login: User['login'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: User['password'];
}

export class AuthenticationLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  login: User['login'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: User['password'];
}

export class AuthenticationRefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  refreshToken: string;
}

export class AuthenticationSignupResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  id: User['id'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  login: User['login'];
}

export class AuthenticationLoginResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  accessToken: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  refreshToken: string;
}

export class AuthenticationRefreshTokenResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  accessToken: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  refreshToken: string;
}
