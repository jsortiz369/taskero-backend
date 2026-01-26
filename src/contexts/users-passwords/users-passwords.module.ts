import { Module } from '@nestjs/common';

import { UuidModule } from 'src/shared/uuid/uuid.module';
import { BcryptModule } from 'src/shared/bcrypt/bcrypt.module';
import { PrismaRepository } from 'src/shared/database/infrastructure/persistences';
import { UserPasswordCommandRepositoryPostgres, UserPasswordQueryRepositoryPostgres } from './infrastructure/persistences';
import { IUserPasswordCommandRepository, IUserPasswordQueryRepository } from './domain/repositories';
import { IUuidRepository } from 'src/shared/uuid/domain/uuid.repository';
import { IBcryptRepository } from 'src/shared/bcrypt/domain/bcrypt.repository';
import * as services from './domain/services';

@Module({
  imports: [UuidModule, BcryptModule],
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
      useFactory: (uuid: IUuidRepository, bcrypt: IBcryptRepository, userCommand: IUserPasswordCommandRepository) =>
        new services.UserPasswordCreateService(uuid, bcrypt, userCommand),
      inject: [IUuidRepository, IBcryptRepository, IUserPasswordCommandRepository],
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
