import { Module } from '@nestjs/common';

import { CryptoModule } from 'src/shared/crypto/crypto.module';
import { PrismaRepository } from 'src/shared/database/infrastructure/persistences';
import { BcryptModule } from 'src/shared/bcrypt/bcrypt.module';
import { IBcryptRepository } from 'src/shared/bcrypt/domain/bcrypt.repository';
import { ICryptoRepository } from 'src/shared/crypto/domain/crypto.repository';
import { IUserTokenCommandRepository, IUserTokenQueryRepository } from './domain/repositories';
import { UserTokenCommandRepositoryPostgres, UserTokenQueryRepositoryPostgres } from './infrastructure/persistences';
import * as services from './domain/services';

@Module({
  imports: [CryptoModule, BcryptModule],
  providers: [
    {
      provide: IUserTokenCommandRepository,
      useFactory: (prisma: PrismaRepository) => new UserTokenCommandRepositoryPostgres(prisma),
      inject: [PrismaRepository],
    },
    {
      provide: IUserTokenQueryRepository,
      useFactory: (prisma: PrismaRepository) => new UserTokenQueryRepositoryPostgres(prisma),
      inject: [PrismaRepository],
    },
    {
      provide: services.UserTokenCreateService,
      useFactory: (uuid: ICryptoRepository, bcrypt: IBcryptRepository, userCommand: IUserTokenCommandRepository) =>
        new services.UserTokenCreateService(uuid, bcrypt, userCommand),
      inject: [ICryptoRepository, IBcryptRepository, IUserTokenCommandRepository],
    },
    {
      provide: services.UserTokenCompareService,
      useFactory: (userQuery: IUserTokenQueryRepository, bcrypt: IBcryptRepository) => new services.UserTokenCompareService(userQuery, bcrypt),
      inject: [IUserTokenQueryRepository, IBcryptRepository],
    },
  ],
  exports: [services.UserTokenCreateService, services.UserTokenCompareService],
})
export class UsersTokensModule {}
