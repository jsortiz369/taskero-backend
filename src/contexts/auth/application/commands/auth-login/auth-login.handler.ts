import { UserLoginService, UserUpdateFailedAttemptsByIdService } from 'src/contexts/users/domain/services';
import { AuthLoginCommand } from './auth-login.command';
import {
  UserInactiveException,
  UserInfoLockException,
  UserLockException,
  UserOrPasswordNotCorrectException,
} from 'src/contexts/auth/domain/exceptions';
import { UserPasswordByIdUserService } from 'src/contexts/user-passwords/domain/services';
import { IBcryptRepository } from 'src/shared/bcrypt/domain/bcrypt.repository';
import { JwtService } from '@nestjs/jwt';

export class AuthLoginHandler {
  constructor(
    private readonly _userLoginService: UserLoginService,
    private readonly _userPasswordByIdUserService: UserPasswordByIdUserService,
    private readonly _userUpdateFailedAttemptsService: UserUpdateFailedAttemptsByIdService,
    private readonly _bycryptRepository: IBcryptRepository,
    private readonly _jwtService: JwtService,
  ) {}

  async execute(command: AuthLoginCommand) {
    // TODO: validate user
    const user = await this._userLoginService.execute(command.username);
    if (!user) throw new UserOrPasswordNotCorrectException();

    // TODO: update failed attempts
    let failedAttempts = (!user.failedAttempts || isNaN(user.failedAttempts) ? 0 : user.failedAttempts) + 1;
    let lockUntil: null | Date = user.lockUntil ? user.lockUntil : null;

    // TODO: reset failed attempts
    if (failedAttempts >= 5 && this.validateIsLockUser(lockUntil)) {
      failedAttempts = 1;
      lockUntil = null;
    }

    // TODO: validate user lock
    if (lockUntil) throw new UserLockException();

    // TODO: get password user by id
    if (lockUntil == null || failedAttempts <= 5) {
      const userPassword = await this._userPasswordByIdUserService.execute(user._id);
      const isValidPassword = await this._bycryptRepository.compare(command.password, userPassword?.password ?? '');
      if (!isValidPassword) {
        await this._userUpdateFailedAttemptsService.execute(user._id, failedAttempts);
        if (failedAttempts == 4) throw new UserInfoLockException();
        else if (failedAttempts >= 5) throw new UserLockException();
        else throw new UserOrPasswordNotCorrectException();
      }
    }

    // TODO: update failed attempts
    await this._userUpdateFailedAttemptsService.execute(user._id, 0);

    // TODO: validate user inactive
    if (!user.status) throw new UserInactiveException();

    const payload = { username: user.username, sub: user._id };
    const token = this._jwtService.sign(payload);
    const tokenRefresh = this._jwtService.sign(payload);

    return {
      user: user,
      token: token,
      tokenRefresh: tokenRefresh,
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
