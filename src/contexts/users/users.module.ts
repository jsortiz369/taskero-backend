import { Module } from '@nestjs/common';

import { IUserQueryRepository, IUserCommandRepository } from './domain/repositories';
import { UserQueryRepositoryPostgres, UserCommandRepositoryPostgres } from './infrastructure/persistences';
import { PrismaRepository } from 'src/shared/database/infrastructure/persistences';
import { DatabaseModule } from 'src/shared/database/database.module';
import { IUuidRepository } from 'src/shared/uuid/domain/uuid.repository';
import { IBcryptRepository } from 'src/shared/bcrypt/domain/bcrypt.repository';
import { UuidModule } from 'src/shared/uuid/uuid.module';
import { BcryptModule } from 'src/shared/bcrypt/bcrypt.module';
import * as services from './domain/services';
import * as controllers from './infrastructure/http/controllers';
import * as handlers from './application';

@Module({
  imports: [DatabaseModule, UuidModule, BcryptModule],
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
      provide: handlers.UserCreateHandler,
      useFactory: (uuid: IUuidRepository, bcrypt: IBcryptRepository, userQuery: IUserQueryRepository, userCommand: IUserCommandRepository) => {
        return new handlers.UserCreateHandler(uuid, bcrypt, userQuery, userCommand);
      },
      inject: [IUuidRepository, IBcryptRepository, IUserQueryRepository, IUserCommandRepository],
    },
    {
      provide: handlers.UserDeleteHandler,
      useFactory: (userQueryFindById: services.UserQueryFindOneByIdService, userCommand: IUserCommandRepository) => {
        return new handlers.UserDeleteHandler(userQueryFindById, userCommand);
      },
      inject: [services.UserQueryFindOneByIdService, IUserCommandRepository],
    },
    {
      provide: handlers.UserUpdateHandler,
      useFactory: (userQueryFindById: services.UserQueryFindOneByIdService, userQuery: IUserQueryRepository, userCommand: IUserCommandRepository) => {
        return new handlers.UserUpdateHandler(userQueryFindById, userQuery, userCommand);
      },
      inject: [services.UserQueryFindOneByIdService, IUserQueryRepository, IUserCommandRepository],
    },
  ],
})
export class UsersModule {}
