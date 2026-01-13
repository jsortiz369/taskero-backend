import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { ROUTES } from 'src/app/http/routes';
import { AuthRegisterConflictDto, AuthRegisterDto } from '../dto';
import * as checkUsername from 'src/contexts/auth/application/queries/auth-register-conflict-username';
import * as checkEmail from 'src/contexts/auth/application/queries/auth-register-conflict-email';
import * as checkPhone from 'src/contexts/auth/application/queries/auth-register-conflict-phone';
import * as register from 'src/contexts/auth/application/commands/auth-register';

@Controller(ROUTES.AUTH)
export class AuthController {
  constructor(
    private readonly _registerConflictUsernameHandler: checkUsername.AuthRegisterConflictUsernameHandler,
    private readonly _registerConflictEmailExistHandler: checkEmail.AuthRegisterConflictEmailHandler,
    private readonly _registerConflictPhoneExistHandler: checkPhone.AuthRegisterConflictPhoneHandler,
    private readonly _registerHandler: register.AuthRegisterHandler,
  ) {}

  @Post('/login')
  login() {
    return 'controller login';
  }

  @Get('/register/conflict/username')
  async conflictUsername(@Query() query: AuthRegisterConflictDto) {
    return await this._registerConflictUsernameHandler.execute(new checkUsername.AuthRegisterConflictUsernameQuery(query.value));
  }

  @Get('/register/conflict/email')
  async conflictEmail(@Query() query: AuthRegisterConflictDto) {
    return await this._registerConflictEmailExistHandler.execute(new checkEmail.AuthRegisterConflictEmailQuery(query.value));
  }

  @Get('/register/conflict/phone')
  async conflictPhone(@Query() query: AuthRegisterConflictDto) {
    return await this._registerConflictPhoneExistHandler.execute(new checkPhone.AuthRegisterConflictPhoneQuery(query.value));
  }

  @Post('/register')
  async register(@Body() body: AuthRegisterDto) {
    return await this._registerHandler.execute(
      new register.AuthRegisterCommand(body.names, body.surnames, body.username, body.phone, body.email, body.password),
    );
  }
}
