import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { UsersPasswordsModule } from './user-passwords/users-passwords.module';

@Module({
  imports: [UsersModule, UsersPasswordsModule],
})
export class ContextsModule {}
