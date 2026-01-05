import { Controller, Get, Post, Query } from '@nestjs/common';

import { ROUTES } from 'src/app/http/routes';
import * as checkEmail from 'src/contexts/auth/application/queries/auth-register-check-email-exist';
import * as checkPhone from 'src/contexts/auth/application/queries/auth-register-check-phone-exist';
import { AuthRegisterCheckExistDto } from '../dto';

@Controller(ROUTES.AUTH)
export class AuthController {
  constructor(
    private readonly _registerCheckEmailExistHandler: checkEmail.AuthRegisterCheckEmailExistHandler,
    private readonly _registerCheckPhoneExistHandler: checkPhone.AuthRegisterCheckPhoneExistHandler,
  ) {}

  @Post('/login')
  login() {
    return 'controller login';
  }

  @Get('/register/exist/email')
  async existsByEmail(@Query() query: AuthRegisterCheckExistDto) {
    return await this._registerCheckEmailExistHandler.execute(new checkEmail.AuthRegisterCheckEmailExistQuery(query.value));
  }

  @Get('/register/exist/phone')
  async existsByPhone(@Query() query: AuthRegisterCheckExistDto) {
    return await this._registerCheckPhoneExistHandler.execute(new checkPhone.AuthRegisterCheckPhoneExistQuery(query.value));
  }

  @Post('/register')
  register() {
    return 'controller register';
  }
}
