import { Module } from '@nestjs/common';

import { UuidModule } from 'src/shared/uuid/uuid.module';
import { UserTokenCommandRepository } from './domain/repositories/user-token-command.repository';
import { UserTokenCommandRepositoryPostgres } from './infrastructure/persistences';
import { PrismaRepository } from 'src/shared/database/infrastructure/persistences';
import { IUuidRepository } from 'src/shared/uuid/domain/uuid.repository';
import { BcryptModule } from 'src/shared/bcrypt/bcrypt.module';
import { IBcryptRepository } from 'src/shared/bcrypt/domain/bcrypt.repository';
import { UserTokenQueryRepository } from './domain/repositories/user-token-query.repository';
import { UserTokenQueryRepositoryPostgres } from './infrastructure/persistences/user-token-query-repository.postgres';
import * as services from './domain/services';

@Module({
  imports: [UuidModule, BcryptModule],
  providers: [
    {
      provide: UserTokenCommandRepository,
      useFactory: (prisma: PrismaRepository) => new UserTokenCommandRepositoryPostgres(prisma),
      inject: [PrismaRepository],
    },
    {
      provide: UserTokenQueryRepository,
      useFactory: (prisma: PrismaRepository) => new UserTokenQueryRepositoryPostgres(prisma),
      inject: [PrismaRepository],
    },
    {
      provide: services.UserTokenCreateService,
      useFactory: (uuid: IUuidRepository, bcrypt: IBcryptRepository, userCommand: UserTokenCommandRepository) =>
        new services.UserTokenCreateService(uuid, bcrypt, userCommand),
      inject: [IUuidRepository, IBcryptRepository, UserTokenCommandRepository],
    },
    {
      provide: services.UserTokenCompareService,
      useFactory: (userQuery: UserTokenQueryRepository, bcrypt: IBcryptRepository) => new services.UserTokenCompareService(userQuery, bcrypt),
      inject: [UserTokenQueryRepository, IBcryptRepository],
    },
  ],
  exports: [services.UserTokenCreateService, services.UserTokenCompareService],
})
export class UsersTokensModule {}
