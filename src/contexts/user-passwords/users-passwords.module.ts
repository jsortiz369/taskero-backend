import { Module } from '@nestjs/common';

import { PrismaRepository } from 'src/shared/database/infrastructure/persistences';
import { UserPasswordCommandRepositoryPostgres, UserPasswordQueryRepositoryPostgres } from './infrastructure/persistences';
import { IUserPasswordCommandRepository, IUserPasswordQueryRepository } from './domain/repositories';
import * as services from './domain/services';

/* 
import * as controllers from './infrastructure/http/controllers';
import * as handlers from './application'; */

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: IUserPasswordCommandRepository,
      useFactory: (prisma: PrismaRepository) => new UserPasswordCommandRepositoryPostgres(prisma),
      inject: [PrismaRepository],
    },
    {
      provide: IUserPasswordQueryRepository,
      useFactory: (prisma: PrismaRepository) => new UserPasswordQueryRepositoryPostgres(prisma),
      inject: [PrismaRepository],
    },
    {
      provide: services.UserPasswordCreateService,
      useFactory: (userCommand: IUserPasswordCommandRepository) => new services.UserPasswordCreateService(userCommand),
      inject: [IUserPasswordCommandRepository],
    },
    {
      provide: services.UserPasswordByIdUserService,
      useFactory: (userQuery: IUserPasswordQueryRepository) => new services.UserPasswordByIdUserService(userQuery),
      inject: [IUserPasswordQueryRepository],
    },
  ],
  exports: [services.UserPasswordCreateService, services.UserPasswordByIdUserService],
})
export class UsersPasswordsModule {}
