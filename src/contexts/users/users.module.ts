import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/shared/database/database.module';
import { UsersPasswordsModule } from '../user-passwords/users-passwords.module';
import { UuidModule } from 'src/shared/uuid/uuid.module';
import { BcryptModule } from 'src/shared/bcrypt/bcrypt.module';
import { IUserQueryRepository, IUserCommandRepository } from './domain/repositories';
import { UserQueryRepositoryPostgres, UserCommandRepositoryPostgres } from './infrastructure/persistences';
import { PrismaRepository } from 'src/shared/database/infrastructure/persistences';
import { IUuidRepository } from 'src/shared/uuid/domain/uuid.repository';
import { IBcryptRepository } from 'src/shared/bcrypt/domain/bcrypt.repository';
import { UserPasswordCreateService } from '../user-passwords/domain/services';
import * as services from './domain/services';
import * as controllers from './infrastructure/http/controllers';
import * as handlers from './application';

@Module({
  imports: [DatabaseModule, UuidModule, BcryptModule, UsersPasswordsModule],
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
        uuid: IUuidRepository,
        conflictUsername: services.UserConflictUsernameService,
        conflictEmail: services.UserConflictEmailService,
        conflictPhone: services.UserConflictPhoneService,
        bcrypt: IBcryptRepository,
        userCommand: IUserCommandRepository,
        userPasswordCreateService: UserPasswordCreateService,
      ) => {
        return new services.UserCreateService(uuid, conflictUsername, conflictEmail, conflictPhone, bcrypt, userCommand, userPasswordCreateService);
      },
      inject: [
        IUuidRepository,
        services.UserConflictUsernameService,
        services.UserConflictEmailService,
        services.UserConflictPhoneService,
        IBcryptRepository,
        IUserCommandRepository,
        UserPasswordCreateService,
      ],
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
  ],
})
export class UsersModule {}
