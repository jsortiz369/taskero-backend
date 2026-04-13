import { Module } from '@nestjs/common';

import { BcryptModule } from 'src/shared/bcrypt/bcrypt.module';
import { CryptoModule } from 'src/shared/crypto/crypto.module';
import { UsersModule } from '../users/users.module';
import { UsersPasswordsModule } from '../users-passwords/users-passwords.module';
import { UserPasswordByIdUserService, UserPasswordCreateService } from '../users-passwords/domain/services';
import { IBcryptRepository } from 'src/shared/bcrypt/domain/bcrypt.repository';
import { IJwtRepository } from 'src/shared/jwt/domain/jwt.repository';
import { ISendEmailBullmqRepository } from 'src/shared/bullmq/domain/repositories/send-email.repository';
import { ICacheRepository } from 'src/shared/cache/domain/cache.repository';
import { ICryptoRepository } from 'src/shared/crypto/domain/crypto.repository';
import * as servicesUser from '../users/domain/services';
import * as controllers from './infrastructure/http/controllers';
import * as handlers from './application';

@Module({
  imports: [BcryptModule, CryptoModule, UsersModule, UsersPasswordsModule],
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
      provide: handlers.AuthVerifyTokenResetPasswordHandler,
      useFactory: (cryptoRepository: ICryptoRepository, cacheRepository: ICacheRepository) =>
        new handlers.AuthVerifyTokenResetPasswordHandler(cryptoRepository, cacheRepository),
      inject: [ICryptoRepository, ICacheRepository],
    },
    {
      provide: handlers.AuthRegisterHandler,
      useFactory: (
        userCreate: servicesUser.UserCreateService,
        IJwtRepository: IJwtRepository,
        cryptoRepository: ICryptoRepository,
        cacheRepository: ICacheRepository,
        sendEmailQueue: ISendEmailBullmqRepository,
      ) => new handlers.AuthRegisterHandler(userCreate, IJwtRepository, cryptoRepository, cacheRepository, sendEmailQueue),
      inject: [servicesUser.UserCreateService, IJwtRepository, ICryptoRepository, ICacheRepository, ISendEmailBullmqRepository],
    },
    {
      provide: handlers.AuthLoginHandler,
      useFactory: (
        userLogin: servicesUser.UserAuthService,
        userPassword: UserPasswordByIdUserService,
        userUpdateFailedAttempts: servicesUser.UserUpdateFailedAttemptsByIdService,
        IBcryptRepository: IBcryptRepository,
        IJwtRepository: IJwtRepository,
        cryptoRepository: ICryptoRepository,
        cacheRepository: ICacheRepository,
        ISendEmailBullmqRepository: ISendEmailBullmqRepository,
      ) =>
        new handlers.AuthLoginHandler(
          userLogin,
          userPassword,
          userUpdateFailedAttempts,
          IBcryptRepository,
          IJwtRepository,
          cryptoRepository,
          cacheRepository,
          ISendEmailBullmqRepository,
        ),
      inject: [
        servicesUser.UserAuthService,
        UserPasswordByIdUserService,
        servicesUser.UserUpdateFailedAttemptsByIdService,
        IBcryptRepository,
        IJwtRepository,
        ICryptoRepository,
        ICacheRepository,
        ISendEmailBullmqRepository,
      ],
    },
    {
      provide: handlers.AuthConfirmHandler,
      useFactory: (
        userById: servicesUser.UserQueryFindOneByIdService,
        cryptoRepository: ICryptoRepository,
        cacheRepository: ICacheRepository,
        userUpdateConfirm: servicesUser.UserUpdateConfirmService,
        jwtRepository: IJwtRepository,
      ) => new handlers.AuthConfirmHandler(userById, cryptoRepository, cacheRepository, userUpdateConfirm, jwtRepository),
      inject: [servicesUser.UserQueryFindOneByIdService, ICryptoRepository, ICacheRepository, servicesUser.UserUpdateConfirmService, IJwtRepository],
    },

    {
      provide: handlers.AuthResendConfirmationTokenHandler,
      useFactory: (
        userById: servicesUser.UserQueryFindOneByIdService,
        cryptoRepository: ICryptoRepository,
        cacheRepository: ICacheRepository,
        sendEmailQueue: ISendEmailBullmqRepository,
      ) => new handlers.AuthResendConfirmationTokenHandler(userById, cryptoRepository, cacheRepository, sendEmailQueue),
      inject: [servicesUser.UserQueryFindOneByIdService, ICryptoRepository, ICacheRepository, ISendEmailBullmqRepository],
    },
    {
      provide: handlers.AuthRecoverPasswordHandler,
      useFactory: (
        userAuth: servicesUser.UserAuthService,
        cryptoRepository: ICryptoRepository,
        cacheRepository: ICacheRepository,
        sendEmailQueue: ISendEmailBullmqRepository,
      ) => new handlers.AuthRecoverPasswordHandler(userAuth, cryptoRepository, cacheRepository, sendEmailQueue),
      inject: [servicesUser.UserAuthService, ICryptoRepository, ICacheRepository, ISendEmailBullmqRepository],
    },
    {
      provide: handlers.AuthResetPasswordHandler,
      useFactory: (cryptoRepository: ICryptoRepository, cacheRepository: ICacheRepository, userPassword: UserPasswordCreateService) =>
        new handlers.AuthResetPasswordHandler(cryptoRepository, cacheRepository, userPassword),
      inject: [ICryptoRepository, ICacheRepository, UserPasswordCreateService],
    },
  ],
})
export class AuthModule {}
