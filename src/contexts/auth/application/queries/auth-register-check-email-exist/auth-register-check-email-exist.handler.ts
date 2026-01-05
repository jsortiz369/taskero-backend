import { UserConflictEmailException } from 'src/contexts/users/domain/exceptions';
import { AuthRegisterCheckEmailExistQuery } from './auth-register-email-exist.query';
import { UserCheckEmailExistService } from 'src/contexts/users/domain/services';

export class AuthRegisterCheckEmailExistHandler {
  /**
   * Creates an instance of AuthRegisterCheckEmailExistHandler.
   * @date 2026-01-05 07:00:18
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserCheckEmailExistService} _userCheckEmailExist
   */
  constructor(private readonly _userCheckEmailExist: UserCheckEmailExistService) {}

  async execute(query: AuthRegisterCheckEmailExistQuery): Promise<{ exist: boolean }> {
    let exist = true;
    try {
      // TODO: validate exist user by email
      exist = await this._userCheckEmailExist.execute(query.email);
    } catch (error) {
      if (!(error instanceof UserConflictEmailException)) throw error;
    }
    return { exist };
  }
}
