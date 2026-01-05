import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { UsersPasswordsModule } from './user-passwords/users-passwords.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, UsersPasswordsModule, AuthModule],
})
export class ContextsModule {}
