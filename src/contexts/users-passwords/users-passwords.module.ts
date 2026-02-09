import { Module } from '@nestjs/common';

import { CryptoModule } from 'src/shared/crypto/crypto.module';
import { BcryptModule } from 'src/shared/bcrypt/bcrypt.module';
import { PrismaRepository } from 'src/shared/database/infrastructure/persistences';
import { UserPasswordCommandRepositoryPostgres, UserPasswordQueryRepositoryPostgres } from './infrastructure/persistences';
import { IUserPasswordCommandRepository, IUserPasswordQueryRepository } from './domain/repositories';
import { ICryptoRepository } from 'src/shared/crypto/domain/crypto.repository';
import { IBcryptRepository } from 'src/shared/bcrypt/domain/bcrypt.repository';
import * as services from './domain/services';

@Module({
  imports: [CryptoModule, BcryptModule],
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
      useFactory: (
        uuid: ICryptoRepository,
        bcrypt: IBcryptRepository,
        userQuery: IUserPasswordQueryRepository,
        userCommand: IUserPasswordCommandRepository,
      ) => new services.UserPasswordCreateService(uuid, bcrypt, userQuery, userCommand),
      inject: [ICryptoRepository, IBcryptRepository, IUserPasswordQueryRepository, IUserPasswordCommandRepository],
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
