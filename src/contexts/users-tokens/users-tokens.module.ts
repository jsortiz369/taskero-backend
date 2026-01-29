import { Module } from '@nestjs/common';

import { UuidModule } from 'src/shared/uuid/uuid.module';
import { UserTokenCommandRepository } from './domain/repositories/user-token-command.repository';
import { UserTokenCommandRepositoryPostgres } from './infrastructure/persistences';
import { PrismaRepository } from 'src/shared/database/infrastructure/persistences';
import { IUuidRepository } from 'src/shared/uuid/domain/uuid.repository';
import * as services from './domain/services';
import { BcryptModule } from 'src/shared/bcrypt/bcrypt.module';
import { IBcryptRepository } from 'src/shared/bcrypt/domain/bcrypt.repository';

@Module({
  imports: [UuidModule, BcryptModule],
  providers: [
    {
      provide: UserTokenCommandRepository,
      useFactory: (prisma: PrismaRepository) => new UserTokenCommandRepositoryPostgres(prisma),
      inject: [PrismaRepository],
    },
    {
      provide: services.UserTokenCreateService,
      useFactory: (uuid: IUuidRepository, bcrypt: IBcryptRepository, userCommand: UserTokenCommandRepository) =>
        new services.UserTokenCreateService(uuid, bcrypt, userCommand),
      inject: [IUuidRepository, IBcryptRepository, UserTokenCommandRepository],
    },
  ],
  exports: [services.UserTokenCreateService],
})
export class UsersTokensModule {}
