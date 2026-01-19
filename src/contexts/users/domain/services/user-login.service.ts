import { Nullable } from 'src/shared/system/domain/system.interface';
import { IUserQueryRepository } from '../repositories';
import { UserLoginProjection } from '../projections/user-login.projection';

export class UserLoginService {
  /**
   * Creates an instance of UserLoginService.
   * @date 2026-01-17 17:18:08
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {IUserQueryRepository} _userQueryRepository
   */
  constructor(private readonly _userQueryRepository: IUserQueryRepository) {}

  async execute(username: string): Promise<Nullable<UserLoginProjection>> {
    // TODO: Check if user exist
    const user = await this._userQueryRepository.findOneByLogin(username);

    /* if (user && user.lockUntil && user.lockUntil > new Date()) {
      console.log('User is locked');
      // TODO: Update login attempts
      const failedAttempts = !user.failedAttempts || isNaN(user.failedAttempts) ? 0 : user.failedAttempts;
      await this._userCommandRepository.updateLoginAttempts(new UserId(user._id), failedAttempts + 1);
    }

    console.log(user); */

    return user;
  }
}
