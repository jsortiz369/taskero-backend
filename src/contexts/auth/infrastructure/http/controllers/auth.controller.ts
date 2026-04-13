import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';

import { ROUTES } from 'src/app/http/routes';
import { ConfirmGuard } from 'src/shared/system/infrastructure/guards/confirm.guard';
import * as dto from '../dto';
import * as checkUsername from 'src/contexts/auth/application/queries/auth-register-conflict-username';
import * as checkEmail from 'src/contexts/auth/application/queries/auth-register-conflict-email';
import * as checkPhone from 'src/contexts/auth/application/queries/auth-register-conflict-phone';
import * as register from 'src/contexts/auth/application/commands/auth-register';
import * as login from 'src/contexts/auth/application/commands/auth-login';
import * as confirm from 'src/contexts/auth/application/commands/auth-confirm';
import * as resendConfirmationToken from 'src/contexts/auth/application/commands/auth-resend-confirmation-token';
import * as recoverPassword from 'src/contexts/auth/application/commands/auth-recover-password';
import * as resetPassword from 'src/contexts/auth/application/commands/auth-reset-password';
import * as verifyTokenResetPassword from 'src/contexts/auth/application/queries/auth-verify-token-reset-password';

@Controller(ROUTES.AUTH)
export class AuthController {
  /**
   * Creates an instance of AuthController.
   * @date 2026-04-12 22:00:09
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {checkUsername.AuthRegisterConflictUsernameHandler} _registerConflictUsernameHandler
   * @param {checkEmail.AuthRegisterConflictEmailHandler} _registerConflictEmailExistHandler
   * @param {checkPhone.AuthRegisterConflictPhoneHandler} _registerConflictPhoneExistHandler
   * @param {register.AuthRegisterHandler} _registerHandler
   * @param {login.AuthLoginHandler} _loginHandler
   * @param {confirm.AuthConfirmHandler} _confirmHandler
   * @param {resendConfirmationToken.AuthResendConfirmationTokenHandler} _resendConfirmationTokenHandler
   * @param {recoverPassword.AuthRecoverPasswordHandler} _recoverPasswordHandler
   * @param {resetPassword.AuthResetPasswordHandler} _resetPasswordHandler
   * @param {verifyTokenResetPassword.AuthVerifyTokenResetPasswordHandler} _verifyTokenResetPasswordHandler
   */
  constructor(
    private readonly _registerConflictUsernameHandler: checkUsername.AuthRegisterConflictUsernameHandler,
    private readonly _registerConflictEmailExistHandler: checkEmail.AuthRegisterConflictEmailHandler,
    private readonly _registerConflictPhoneExistHandler: checkPhone.AuthRegisterConflictPhoneHandler,
    private readonly _registerHandler: register.AuthRegisterHandler,
    private readonly _loginHandler: login.AuthLoginHandler,
    private readonly _confirmHandler: confirm.AuthConfirmHandler,
    private readonly _resendConfirmationTokenHandler: resendConfirmationToken.AuthResendConfirmationTokenHandler,
    private readonly _recoverPasswordHandler: recoverPassword.AuthRecoverPasswordHandler,
    private readonly _resetPasswordHandler: resetPassword.AuthResetPasswordHandler,
    private readonly _verifyTokenResetPasswordHandler: verifyTokenResetPassword.AuthVerifyTokenResetPasswordHandler,
  ) {}

  @Get('/register/conflict/username')
  async conflictUsername(@Query() query: dto.AuthRegisterConflictDto) {
    return await this._registerConflictUsernameHandler.execute(new checkUsername.AuthRegisterConflictUsernameQuery(query.value));
  }

  @Get('/register/conflict/email')
  async conflictEmail(@Query() query: dto.AuthRegisterConflictDto) {
    return await this._registerConflictEmailExistHandler.execute(new checkEmail.AuthRegisterConflictEmailQuery(query.value));
  }

  @Get('/register/conflict/phone')
  async conflictPhone(@Query() query: dto.AuthRegisterConflictDto) {
    return await this._registerConflictPhoneExistHandler.execute(new checkPhone.AuthRegisterConflictPhoneQuery(query.value));
  }

  @Get('/reset-password/verify-token')
  async verifyToken(@Query() query: dto.AuthVerifyTokenResetPasswordDto) {
    return await this._verifyTokenResetPasswordHandler.execute(new verifyTokenResetPassword.AuthVerifyTokenResetPasswordQuery(query.token));
  }

  @Post('/register')
  async register(@Body() body: dto.AuthRegisterDto) {
    return await this._registerHandler.execute(
      new register.AuthRegisterCommand(body.names, body.surnames, body.username, body.phone, body.email, body.password),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() body: dto.AuthLoginDto, @Req() request: FastifyRequest, @Res({ passthrough: true }) response: FastifyReply) {
    const ip = request.ip;

    const dataAgent = request.userAgentData;
    const result = await this._loginHandler.execute(
      new login.AuthLoginCommand(
        body.username,
        body.password,
        ip,
        dataAgent?.browser || 'Postman',
        dataAgent?.version,
        dataAgent?.device,
        dataAgent?.os,
      ),
    );

    if (result.tokenConfirm) return result;

    const accessToken = result.cookies!.token;
    const refreshToken = result.cookies!.tokenRefresh;
    response.setCookie('access_token', accessToken);
    response.setCookie('refresh_token', refreshToken);
    return { ...result.data };
  }

  @UseGuards(ConfirmGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/confirm')
  async confirmAccount(@Body() body: dto.AuthConfirmDto, @Req() request: FastifyRequest) {
    return await this._confirmHandler.execute(new confirm.AuthConfirmCommand(body.otp, request.idUser!));
  }

  @UseGuards(ConfirmGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/resend-confirmation-token')
  async resendConfirmationToken(@Req() request: FastifyRequest) {
    return await this._resendConfirmationTokenHandler.execute(new resendConfirmationToken.AuthResendConfirmationTokenCommand(request.idUser!));
  }

  @HttpCode(HttpStatus.OK)
  @Post('/recover-password')
  async recoverPassword(@Body() body: dto.AuthRecoverPasswordDto) {
    return await this._recoverPasswordHandler.execute(new recoverPassword.AuthRecoverPasswordCommand(body.username));
  }

  @HttpCode(HttpStatus.OK)
  @Post('/reset-password')
  async resetPassword(@Body() body: dto.AuthResetPasswordDto) {
    return await this._resetPasswordHandler.execute(new resetPassword.AuthResetPasswordCommand(body.token, body.password));
  }
}
