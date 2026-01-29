import { UserLoginService, UserUpdateFailedAttemptsByIdService } from 'src/contexts/users/domain/services';
import { AuthLoginCommand } from './auth-login.command';
import { UserPasswordByIdUserService } from 'src/contexts/users-passwords/domain/services';
import { IBcryptRepository } from 'src/shared/bcrypt/domain/bcrypt.repository';
import { IJwtRepository } from 'src/shared/jwt/domain/jwt.repository';
import { ISendEmailBullmqRepository } from 'src/shared/bullmq/domain/repositories/send-email.repository';
import { UserTokenCreateService } from 'src/contexts/users-tokens/domain/services';
import * as E from 'src/contexts/auth/domain/exceptions';

export class AuthLoginHandler {
  /**
   * Creates an instance of AuthLoginHandler.
   * @date 2026-01-23 08:41:34
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserLoginService} _userLoginService
   * @param {UserPasswordByIdUserService} _userPasswordByIdUserService
   * @param {UserUpdateFailedAttemptsByIdService} _userUpdateFailedAttemptsService
   * @param {IBcryptRepository} _bycryptRepository
   * @param {UserTokenCreateService} _userTokenCreateService
   * @param {IJwtRepository} _jwtRepository
   */
  constructor(
    private readonly _userLoginService: UserLoginService,
    private readonly _userPasswordByIdUserService: UserPasswordByIdUserService,
    private readonly _userUpdateFailedAttemptsService: UserUpdateFailedAttemptsByIdService,
    private readonly _bycryptRepository: IBcryptRepository,
    private readonly _jwtRepository: IJwtRepository,
    private readonly _userTokenCreateService: UserTokenCreateService,
    private readonly _sendEmailQueue: ISendEmailBullmqRepository,
  ) {}

  async execute(command: AuthLoginCommand) {
    // TODO: validate user
    const user = await this._userLoginService.execute(command.username);
    if (!user) throw new E.UserOrPasswordNotCorrectException();

    // TODO: update failed attempts
    let failedAttempts = (!user.failedAttempts || isNaN(user.failedAttempts) ? 0 : user.failedAttempts) + 1;
    let lockUntil: null | Date = user.lockUntil ? user.lockUntil : null;

    // TODO: reset failed attempts
    if (lockUntil && failedAttempts >= 5 && lockUntil < new Date()) {
      failedAttempts = 1;
      lockUntil = null;
    }

    const userPassword = await this._userPasswordByIdUserService.execute(user._id);
    const isValidPassword = await this._bycryptRepository.compare(command.password, userPassword?.password ?? '');
    if (!isValidPassword) {
      if (!lockUntil) await this._userUpdateFailedAttemptsService.execute(user._id, failedAttempts);
      if (failedAttempts == 4) throw new E.UserInfoLockException();
      else throw new E.UserOrPasswordNotCorrectException();
    }

    // TODO: validate user lock
    if (lockUntil) throw new E.UserLockException();

    // TODO: update failed attempts
    await this._userUpdateFailedAttemptsService.execute(user._id, 0);

    // TODO: validate user inactive
    if (!user.status) throw new E.UserInactiveException();

    // TODO: validate user confirmed
    if (!user.confirmed) {
      const token = await this._userTokenCreateService.execute(user._id);
      await this._sendEmailQueue.addJob({ email: user.email, code: token });
      return { tokenConfirm: this._jwtRepository.generateConfirmAccount({ sub: user._id }) };
    }

    const payload = { username: user.username, sub: user._id };
    const token = this._jwtRepository.generate(payload);
    const tokenRefresh = this._jwtRepository.generateRefresh(payload);

    return {
      token: token,
      tokenRefresh: tokenRefresh,
      data: {
        names: user.names,
        surnames: user.surnames,
        username: user.username,
        email: user.email,
        confirmed: user.confirmed,
      },
    };
  }
}
