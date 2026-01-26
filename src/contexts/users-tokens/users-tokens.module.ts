import { Module } from '@nestjs/common';

import { UuidModule } from 'src/shared/uuid/uuid.module';
import { UserTokenCommandRepository } from './domain/repositories/user-token-command.repository';
import { UserTokenCommandRepositoryPostgres } from './infrastructure/persistences';
import { PrismaRepository } from 'src/shared/database/infrastructure/persistences';
import { IUuidRepository } from 'src/shared/uuid/domain/uuid.repository';
import * as services from './domain/services';

@Module({
  imports: [UuidModule],
  providers: [
    {
      provide: UserTokenCommandRepository,
      useFactory: (prisma: PrismaRepository) => new UserTokenCommandRepositoryPostgres(prisma),
      inject: [PrismaRepository],
    },
    {
      provide: services.UserTokenCreateService,
      useFactory: (uuid: IUuidRepository) => new services.UserTokenCreateService(uuid),
      inject: [IUuidRepository],
    },
  ],
  exports: [services.UserTokenCreateService],
})
export class UsersTokensModule {}
