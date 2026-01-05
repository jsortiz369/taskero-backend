import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { UserCheckEmailExistService, UserCheckPhoneExistService } from '../users/domain/services';
//import * as services from './domain/services';
import * as controllers from './infrastructure/http/controllers';
import * as handlers from './application';

@Module({
  imports: [UsersModule],
  controllers: [controllers.AuthController],
  providers: [
    {
      provide: handlers.AuthRegisterCheckEmailExistHandler,
      useFactory: (userCheckEmailExist: UserCheckEmailExistService) => new handlers.AuthRegisterCheckEmailExistHandler(userCheckEmailExist),
      inject: [UserCheckEmailExistService],
    },
    {
      provide: handlers.AuthRegisterCheckPhoneExistHandler,
      useFactory: (userCheckPhoneExist: UserCheckPhoneExistService) => new handlers.AuthRegisterCheckPhoneExistHandler(userCheckPhoneExist),
      inject: [UserCheckPhoneExistService],
    },
  ],
})
export class AuthModule {}
