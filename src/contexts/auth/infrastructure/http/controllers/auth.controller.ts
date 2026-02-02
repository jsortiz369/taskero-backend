import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';

import { ROUTES } from 'src/app/http/routes';
import { ConfirmGuard } from 'src/shared/system/infrastructure/guards/confirm.guard';
import { AuthConfirmDto, AuthLoginDto, AuthRegisterConflictDto, AuthRegisterDto } from '../dto';
import * as checkUsername from 'src/contexts/auth/application/queries/auth-register-conflict-username';
import * as checkEmail from 'src/contexts/auth/application/queries/auth-register-conflict-email';
import * as checkPhone from 'src/contexts/auth/application/queries/auth-register-conflict-phone';
import * as register from 'src/contexts/auth/application/commands/auth-register';
import * as login from 'src/contexts/auth/application/commands/auth-login';
import * as confirm from 'src/contexts/auth/application/commands/auth-confirm';
import * as resendConfirmationToken from 'src/contexts/auth/application/commands/auth-resend-confirmation-token';

@Controller(ROUTES.AUTH)
export class AuthController {
  constructor(
    private readonly _registerConflictUsernameHandler: checkUsername.AuthRegisterConflictUsernameHandler,
    private readonly _registerConflictEmailExistHandler: checkEmail.AuthRegisterConflictEmailHandler,
    private readonly _registerConflictPhoneExistHandler: checkPhone.AuthRegisterConflictPhoneHandler,
    private readonly _registerHandler: register.AuthRegisterHandler,
    private readonly _loginHandler: login.AuthLoginHandler,
    private readonly _confirmHandler: confirm.AuthConfirmHandler,
    private readonly _resendConfirmationTokenHandler: resendConfirmationToken.AuthResendConfirmationTokenHandler,
  ) {}

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

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() body: AuthLoginDto) {
    return await this._loginHandler.execute(new login.AuthLoginCommand(body.username, body.password));
  }

  @UseGuards(ConfirmGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/confirm')
  async confirmAccount(@Body() body: AuthConfirmDto, @Req() request: FastifyRequest) {
    return await this._confirmHandler.execute(new confirm.AuthConfirmCommand(body.otp, request['idUser'] as string));
  }

  @UseGuards(ConfirmGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/resend-confirmation-token')
  async resendConfirmationToken(@Req() request: FastifyRequest) {
    return await this._resendConfirmationTokenHandler.execute(
      new resendConfirmationToken.AuthResendConfirmationTokenCommand(request['idUser'] as string),
    );
  }
}
