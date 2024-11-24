import { Module } from '@nestjs/common';

import { AuthorizationModule } from '../authorization/authorization.module';
import { RepositoriesModule } from '../repositories/repositories.module';

import { AuthenticationService } from './authentication.service';

import { AuthenticationController } from './authentication.controller';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  imports: [AuthorizationModule, RepositoriesModule],
})
export class AuthenticationModule {}
