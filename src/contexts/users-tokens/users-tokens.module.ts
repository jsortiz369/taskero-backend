import { Module } from '@nestjs/common';

import { CryptoModule } from 'src/shared/crypto/crypto.module';
import { PrismaRepository } from 'src/shared/database/infrastructure/persistences';
import { IUserTokenCommandRepository, IUserTokenQueryRepository } from './domain/repositories';
import { UserTokenCommandRepositoryPostgres, UserTokenQueryRepositoryPostgres } from './infrastructure/persistences';
import { ICryptoRepository } from 'src/shared/crypto/domain/crypto.repository';
import * as services from './domain/services';

@Module({
  imports: [CryptoModule],
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
      useFactory: (crypto: ICryptoRepository, userCommand: IUserTokenCommandRepository) => new services.UserTokenCreateService(crypto, userCommand),
      inject: [ICryptoRepository, IUserTokenCommandRepository],
    },
    {
      provide: services.UserTokenCompareService,
      useFactory: (crypto: ICryptoRepository, tokenQuery: IUserTokenQueryRepository) => new services.UserTokenCompareService(crypto, tokenQuery),
      inject: [ICryptoRepository, IUserTokenQueryRepository],
    },
    {
      provide: services.UserTokenValidateTokenService,
      useFactory: (crypto: ICryptoRepository, tokenQuery: IUserTokenQueryRepository) =>
        new services.UserTokenValidateTokenService(crypto, tokenQuery),
      inject: [ICryptoRepository, IUserTokenQueryRepository],
    },
    {
      provide: services.UserTokenUpdateUsedService,
      useFactory: (userCommand: IUserTokenCommandRepository) => new services.UserTokenUpdateUsedService(userCommand),
      inject: [IUserTokenCommandRepository],
    },
  ],
  exports: [
    services.UserTokenCreateService,
    services.UserTokenCompareService,
    services.UserTokenValidateTokenService,
    services.UserTokenUpdateUsedService,
  ],
})
export class UsersTokensModule {}
