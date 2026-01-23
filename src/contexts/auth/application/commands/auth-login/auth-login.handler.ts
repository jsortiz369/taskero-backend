import { UserLoginService, UserUpdateFailedAttemptsByIdService } from 'src/contexts/users/domain/services';
import { AuthLoginCommand } from './auth-login.command';
import { UserPasswordByIdUserService } from 'src/contexts/user-passwords/domain/services';
import { IBcryptRepository } from 'src/shared/bcrypt/domain/bcrypt.repository';
import { IJwtRepository } from 'src/shared/jwt/domain/jwt.repository';
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
   * @param {IJwtRepository} _jwtRepository
   */
  constructor(
    private readonly _userLoginService: UserLoginService,
    private readonly _userPasswordByIdUserService: UserPasswordByIdUserService,
    private readonly _userUpdateFailedAttemptsService: UserUpdateFailedAttemptsByIdService,
    private readonly _bycryptRepository: IBcryptRepository,
    private readonly _jwtRepository: IJwtRepository,
  ) {}

  async execute(command: AuthLoginCommand) {
    // TODO: validate user
    const user = await this._userLoginService.execute(command.username);
    if (!user) throw new E.UserOrPasswordNotCorrectException();

    // TODO: update failed attempts
    let failedAttempts = (!user.failedAttempts || isNaN(user.failedAttempts) ? 0 : user.failedAttempts) + 1;
    let lockUntil: null | Date = user.lockUntil ? user.lockUntil : null;

    // TODO: reset failed attempts
    if (failedAttempts >= 5 && this.validateIsLockUser(lockUntil)) {
      failedAttempts = 1;
      lockUntil = null;
    }

    // TODO: validate user lock
    if (lockUntil) throw new E.UserLockException();

    // TODO: get password user by id
    if (lockUntil == null || failedAttempts <= 5) {
      const userPassword = await this._userPasswordByIdUserService.execute(user._id);
      const isValidPassword = await this._bycryptRepository.compare(command.password, userPassword?.password ?? '');
      if (!isValidPassword) {
        await this._userUpdateFailedAttemptsService.execute(user._id, failedAttempts);
        if (failedAttempts == 4) throw new E.UserInfoLockException();
        else if (failedAttempts >= 5) throw new E.UserLockException();
        else throw new E.UserOrPasswordNotCorrectException();
      }
    }

    // TODO: update failed attempts
    await this._userUpdateFailedAttemptsService.execute(user._id, 0);

    // TODO: validate user inactive
    if (!user.status) throw new E.UserInactiveException();

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

  private validateIsLockUser(date: Date | null): boolean {
    if (!date) return false;

    const curreentDate = new Date();
    curreentDate.setHours(0, 0, 0, 0);
    const dateLock = new Date(date);
    dateLock.setHours(0, 0, 0, 0);

    return dateLock < curreentDate;
  }
}
