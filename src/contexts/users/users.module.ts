import { Module } from '@nestjs/common';

import { IUserRepository } from './domain/repositories';
import { UserRepositoryPostgres } from './infrastructure/persistences/user-repository.postgres';
import { PrismaRepository } from 'src/shared/database/infrastructure/persistences';
import { DatabaseModule } from 'src/shared/database/database.module';
import { IUuidRepository } from 'src/shared/uuid/domain/uuid.repository';
import { IBcryptRepository } from 'src/shared/bcrypt/domain/bcrypt.repository';
import { UuidModule } from 'src/shared/uuid/uuid.module';
import { BcryptModule } from 'src/shared/bcrypt/bcrypt.module';
import * as controllers from './infrastructure/http/controllers';
import * as handlers from './application';

@Module({
  imports: [DatabaseModule, UuidModule, BcryptModule],
  controllers: [controllers.UserController],
  providers: [
    {
      provide: IUserRepository,
      useFactory: (prisma: PrismaRepository) => new UserRepositoryPostgres(prisma),
      inject: [PrismaRepository],
    },
    {
      provide: handlers.UserCreateHandler,
      useFactory: (_uuidRepository: IUuidRepository, _bcryptRepository: IBcryptRepository, _userRepository: IUserRepository) => {
        return new handlers.UserCreateHandler(_uuidRepository, _bcryptRepository, _userRepository);
      },
      inject: [IUuidRepository, IBcryptRepository, IUserRepository],
    },
  ],
})
export class UsersModule {}
