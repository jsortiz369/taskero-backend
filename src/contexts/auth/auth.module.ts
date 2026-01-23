import { Module } from '@nestjs/common';

import { BcryptModule } from 'src/shared/bcrypt/bcrypt.module';
import { UsersModule } from '../users/users.module';
import { JwtModule } from 'src/shared/jwt/jwt.module';
import { UsersPasswordsModule } from '../user-passwords/users-passwords.module';
import { UserPasswordByIdUserService } from '../user-passwords/domain/services';
import { IBcryptRepository } from 'src/shared/bcrypt/domain/bcrypt.repository';
import { IJwtRepository } from 'src/shared/jwt/domain/jwt.repository';
import * as servicesUser from '../users/domain/services';
import * as controllers from './infrastructure/http/controllers';
import * as handlers from './application';

@Module({
  imports: [BcryptModule, JwtModule, UsersModule, UsersPasswordsModule],
  controllers: [controllers.AuthController],
  providers: [
    {
      provide: handlers.AuthRegisterConflictUsernameHandler,
      useFactory: (conflictUsername: servicesUser.UserConflictUsernameService) => new handlers.AuthRegisterConflictUsernameHandler(conflictUsername),
      inject: [servicesUser.UserConflictUsernameService],
    },
    {
      provide: handlers.AuthRegisterConflictEmailHandler,
      useFactory: (conflictEmail: servicesUser.UserConflictEmailService) => new handlers.AuthRegisterConflictEmailHandler(conflictEmail),
      inject: [servicesUser.UserConflictEmailService],
    },
    {
      provide: handlers.AuthRegisterConflictPhoneHandler,
      useFactory: (conflictPhone: servicesUser.UserConflictPhoneService) => new handlers.AuthRegisterConflictPhoneHandler(conflictPhone),
      inject: [servicesUser.UserConflictPhoneService],
    },
    {
      provide: handlers.AuthRegisterHandler,
      useFactory: (userCreate: servicesUser.UserCreateService) => new handlers.AuthRegisterHandler(userCreate),
      inject: [servicesUser.UserCreateService],
    },
    {
      provide: handlers.AuthLoginHandler,
      useFactory: (
        userLogin: servicesUser.UserLoginService,
        userPassword: UserPasswordByIdUserService,
        userUpdateFailedAttempts: servicesUser.UserUpdateFailedAttemptsByIdService,
        IBcryptRepository: IBcryptRepository,
        IJwtRepository: IJwtRepository,
      ) => new handlers.AuthLoginHandler(userLogin, userPassword, userUpdateFailedAttempts, IBcryptRepository, IJwtRepository),
      inject: [
        servicesUser.UserLoginService,
        UserPasswordByIdUserService,
        servicesUser.UserUpdateFailedAttemptsByIdService,
        IBcryptRepository,
        IJwtRepository,
      ],
    },
  ],
})
export class AuthModule {}
