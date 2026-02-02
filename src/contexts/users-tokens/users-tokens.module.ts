import { Module } from '@nestjs/common';

import { UuidModule } from 'src/shared/uuid/uuid.module';
import { PrismaRepository } from 'src/shared/database/infrastructure/persistences';
import { IUuidRepository } from 'src/shared/uuid/domain/uuid.repository';
import { BcryptModule } from 'src/shared/bcrypt/bcrypt.module';
import { IBcryptRepository } from 'src/shared/bcrypt/domain/bcrypt.repository';
import { IUserTokenCommandRepository, IUserTokenQueryRepository } from './domain/repositories';
import { UserTokenCommandRepositoryPostgres, UserTokenQueryRepositoryPostgres } from './infrastructure/persistences';
import * as services from './domain/services';

@Module({
  imports: [UuidModule, BcryptModule],
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
      useFactory: (uuid: IUuidRepository, bcrypt: IBcryptRepository, userCommand: IUserTokenCommandRepository) =>
        new services.UserTokenCreateService(uuid, bcrypt, userCommand),
      inject: [IUuidRepository, IBcryptRepository, IUserTokenCommandRepository],
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
