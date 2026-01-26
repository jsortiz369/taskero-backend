import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { UsersPasswordsModule } from './users-passwords/users-passwords.module';
import { UsersTokensModule } from './users-tokens/users-tokens.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, UsersPasswordsModule, UsersTokensModule, AuthModule],
  providers: [],
})
export class ContextsModule {}
