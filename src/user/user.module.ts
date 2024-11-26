import { Module } from '@nestjs/common';

import { RepositoriesModule } from '../repositories/repositories.module';

import { UserService } from './user.service';

import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [RepositoriesModule],
})
export class UserModule {}
