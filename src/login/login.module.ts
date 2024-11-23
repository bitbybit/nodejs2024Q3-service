import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { RepositoriesModule } from '../repositories/repositories.module';

import { LoginService } from './login.service';

import { LoginController } from './login.controller';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [AuthModule, RepositoriesModule],
})
export class LoginModule {}
