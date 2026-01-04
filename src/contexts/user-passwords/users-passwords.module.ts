import { Module } from '@nestjs/common';

import { PrismaRepository } from 'src/shared/database/infrastructure/persistences';
import { DatabaseModule } from 'src/shared/database/database.module';
import * as services from './domain/services';
import { IUserPasswordCommandRepository } from './domain/repositories/user-password-command.repository';
import { UserPasswordCommandRepositoryPostgres } from './infrastructure/persistences';

/* 
import * as controllers from './infrastructure/http/controllers';
import * as handlers from './application'; */

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    {
      provide: IUserPasswordCommandRepository,
      useFactory: (prisma: PrismaRepository) => new UserPasswordCommandRepositoryPostgres(prisma),
      inject: [PrismaRepository],
    },
    {
      provide: services.UserPasswordCreateService,
      useFactory: (userCommand: IUserPasswordCommandRepository) => new services.UserPasswordCreateService(userCommand),
      inject: [IUserPasswordCommandRepository],
    },
  ],
  exports: [services.UserPasswordCreateService],
})
export class UsersPasswordsModule {}
