import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { RepositoriesModule } from '../repositories/repositories.module';

import { UserService } from './user.service';

import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [AuthModule, RepositoriesModule],
})
export class UserModule {}
