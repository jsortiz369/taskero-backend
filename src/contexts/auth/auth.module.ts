import { Module } from '@nestjs/common';

import { BcryptModule } from 'src/shared/bcrypt/bcrypt.module';
import { UsersModule } from '../users/users.module';
import { UsersPasswordsModule } from '../users-passwords/users-passwords.module';
import { UsersTokensModule } from '../users-tokens/users-tokens.module';
import { UserPasswordByIdUserService, UserPasswordCreateService } from '../users-passwords/domain/services';
import { IBcryptRepository } from 'src/shared/bcrypt/domain/bcrypt.repository';
import { IJwtRepository } from 'src/shared/jwt/domain/jwt.repository';
import { ISendEmailBullmqRepository } from 'src/shared/bullmq/domain/repositories/send-email.repository';
import {
  UserTokenCompareService,
  UserTokenCreateService,
  UserTokenUpdateUsedService,
  UserTokenValidateTokenService,
} from '../users-tokens/domain/services';
import * as servicesUser from '../users/domain/services';
import * as controllers from './infrastructure/http/controllers';
import * as handlers from './application';

@Module({
  imports: [BcryptModule, UsersModule, UsersPasswordsModule, UsersTokensModule],
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
      useFactory: (
        userCreate: servicesUser.UserCreateService,
        IJwtRepository: IJwtRepository,
        userTokenCreateService: UserTokenCreateService,
        sendEmailQueue: ISendEmailBullmqRepository,
      ) => new handlers.AuthRegisterHandler(userCreate, IJwtRepository, userTokenCreateService, sendEmailQueue),
      inject: [servicesUser.UserCreateService, IJwtRepository, UserTokenCreateService, ISendEmailBullmqRepository],
    },
    {
      provide: handlers.AuthLoginHandler,
      useFactory: (
        userLogin: servicesUser.UserAuthService,
        userPassword: UserPasswordByIdUserService,
        userUpdateFailedAttempts: servicesUser.UserUpdateFailedAttemptsByIdService,
        IBcryptRepository: IBcryptRepository,
        IJwtRepository: IJwtRepository,
        UserTokenCreateService: UserTokenCreateService,
        ISendEmailBullmqRepository: ISendEmailBullmqRepository,
      ) =>
        new handlers.AuthLoginHandler(
          userLogin,
          userPassword,
          userUpdateFailedAttempts,
          IBcryptRepository,
          IJwtRepository,
          UserTokenCreateService,
          ISendEmailBullmqRepository,
        ),
      inject: [
        servicesUser.UserAuthService,
        UserPasswordByIdUserService,
        servicesUser.UserUpdateFailedAttemptsByIdService,
        IBcryptRepository,
        IJwtRepository,
        UserTokenCreateService,
        ISendEmailBullmqRepository,
      ],
    },
    {
      provide: handlers.AuthConfirmHandler,
      useFactory: (
        userById: servicesUser.UserQueryFindOneByIdService,
        userTokenCompare: UserTokenCompareService,
        userUpdateConfirm: servicesUser.UserUpdateConfirmService,
        jwtRepository: IJwtRepository,
        updateTokenUsed: UserTokenUpdateUsedService,
      ) => new handlers.AuthConfirmHandler(userById, userTokenCompare, userUpdateConfirm, jwtRepository, updateTokenUsed),
      inject: [
        servicesUser.UserQueryFindOneByIdService,
        UserTokenCompareService,
        servicesUser.UserUpdateConfirmService,
        IJwtRepository,
        UserTokenUpdateUsedService,
      ],
    },

    {
      provide: handlers.AuthResendConfirmationTokenHandler,
      useFactory: (
        userById: servicesUser.UserQueryFindOneByIdService,
        userTokenCreate: UserTokenCreateService,
        sendEmailQueue: ISendEmailBullmqRepository,
      ) => new handlers.AuthResendConfirmationTokenHandler(userById, userTokenCreate, sendEmailQueue),
      inject: [servicesUser.UserQueryFindOneByIdService, UserTokenCreateService, ISendEmailBullmqRepository],
    },
    {
      provide: handlers.AuthRecoverPasswordHandler,
      useFactory: (userAuth: servicesUser.UserAuthService, userTokenCreate: UserTokenCreateService, sendEmailQueue: ISendEmailBullmqRepository) =>
        new handlers.AuthRecoverPasswordHandler(userAuth, userTokenCreate, sendEmailQueue),
      inject: [servicesUser.UserAuthService, UserTokenCreateService, ISendEmailBullmqRepository],
    },
    {
      provide: handlers.AuthResetPasswordHandler,
      useFactory: (userToken: UserTokenValidateTokenService, userPassword: UserPasswordCreateService, updateTokenUsed: UserTokenUpdateUsedService) =>
        new handlers.AuthResetPasswordHandler(userToken, userPassword, updateTokenUsed),
      inject: [UserTokenValidateTokenService, UserPasswordCreateService, UserTokenUpdateUsedService],
    },
  ],
})
export class AuthModule {}
