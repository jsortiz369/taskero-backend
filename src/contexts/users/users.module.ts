import { Module } from '@nestjs/common';

import { UsersPasswordsModule } from '../users-passwords/users-passwords.module';
import { CryptoModule } from 'src/shared/crypto/crypto.module';
import { IUserQueryRepository, IUserCommandRepository } from './domain/repositories';
import { UserQueryRepositoryPostgres, UserCommandRepositoryPostgres } from './infrastructure/persistences';
import { PrismaRepository } from 'src/shared/database/infrastructure/persistences';
import { ICryptoRepository } from 'src/shared/crypto/domain/crypto.repository';
import { UserPasswordCreateService } from '../users-passwords/domain/services';
import * as services from './domain/services';
import * as controllers from './infrastructure/http/controllers';
import * as handlers from './application';

@Module({
  imports: [CryptoModule, UsersPasswordsModule],
  controllers: [controllers.UserController],
  providers: [
    {
      provide: IUserCommandRepository,
      useFactory: (prisma: PrismaRepository) => new UserCommandRepositoryPostgres(prisma),
      inject: [PrismaRepository],
    },
    {
      provide: IUserQueryRepository,
      useFactory: (prisma: PrismaRepository) => new UserQueryRepositoryPostgres(prisma),
      inject: [PrismaRepository],
    },
    {
      provide: services.UserQueryFindOneByIdService,
      useFactory: (userQuery: IUserQueryRepository) => new services.UserQueryFindOneByIdService(userQuery),
      inject: [IUserQueryRepository],
    },
    {
      provide: services.UserConflictUsernameService,
      useFactory: (userQuery: IUserQueryRepository) => new services.UserConflictUsernameService(userQuery),
      inject: [IUserQueryRepository],
    },
    {
      provide: services.UserConflictEmailService,
      useFactory: (userQuery: IUserQueryRepository) => new services.UserConflictEmailService(userQuery),
      inject: [IUserQueryRepository],
    },
    {
      provide: services.UserConflictPhoneService,
      useFactory: (userQuery: IUserQueryRepository) => new services.UserConflictPhoneService(userQuery),
      inject: [IUserQueryRepository],
    },
    {
      provide: services.UserCreateService,
      useFactory: (
        uuid: ICryptoRepository,
        conflictUsername: services.UserConflictUsernameService,
        conflictEmail: services.UserConflictEmailService,
        conflictPhone: services.UserConflictPhoneService,
        userCommand: IUserCommandRepository,
        userPasswordCreateService: UserPasswordCreateService,
      ) => {
        return new services.UserCreateService(uuid, conflictUsername, conflictEmail, conflictPhone, userCommand, userPasswordCreateService);
      },
      inject: [
        ICryptoRepository,
        services.UserConflictUsernameService,
        services.UserConflictEmailService,
        services.UserConflictPhoneService,
        IUserCommandRepository,
        UserPasswordCreateService,
      ],
    },
    {
      provide: services.UserUpdateFailedAttemptsByIdService,
      useFactory: (userCommand: IUserCommandRepository) => {
        return new services.UserUpdateFailedAttemptsByIdService(userCommand);
      },
      inject: [IUserCommandRepository],
    },
    {
      provide: services.UserAuthService,
      useFactory: (userQuery: IUserQueryRepository) => {
        return new services.UserAuthService(userQuery);
      },
      inject: [IUserQueryRepository, IUserCommandRepository],
    },
    {
      provide: services.UserUpdateConfirmService,
      useFactory: (userCommand: IUserCommandRepository) => {
        return new services.UserUpdateConfirmService(userCommand);
      },
      inject: [IUserCommandRepository],
    },
    {
      provide: handlers.UserFindAllHandler,
      useFactory: (userQuery: IUserQueryRepository) => {
        return new handlers.UserFindAllHandler(userQuery);
      },
      inject: [IUserQueryRepository],
    },
    {
      provide: handlers.UserFindOneByIdHandler,
      useFactory: (userQueryFindById: services.UserQueryFindOneByIdService) => {
        return new handlers.UserFindOneByIdHandler(userQueryFindById);
      },
      inject: [services.UserQueryFindOneByIdService],
    },
  ],
  exports: [
    services.UserConflictUsernameService,
    services.UserConflictEmailService,
    services.UserConflictPhoneService,
    services.UserQueryFindOneByIdService,
    services.UserCreateService,
    services.UserUpdateFailedAttemptsByIdService,
    services.UserAuthService,
    services.UserUpdateConfirmService,
  ],
})
export class UsersModule {}
