import { Module } from '@nestjs/common';

import { AuthorizationModule } from '../authorization/authorization.module';
import { RepositoriesModule } from '../repositories/repositories.module';

import { UserService } from './user.service';

import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [AuthorizationModule, RepositoriesModule],
})
export class UserModule {}
