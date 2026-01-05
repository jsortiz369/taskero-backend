import { UserConflictPhoneException } from 'src/contexts/users/domain/exceptions';
import { AuthRegisterCheckPhoneExistQuery } from './auth-register-phone-exist.query';
import { UserCheckPhoneExistService } from 'src/contexts/users/domain/services';

export class AuthRegisterCheckPhoneExistHandler {
  /**
   * Creates an instance of AuthRegisterCheckPhoneExistHandler.
   * @date 2026-01-05 07:07:59
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserCheckPhoneExistService} _userCheckPhoneExist
   */
  constructor(private readonly _userCheckPhoneExist: UserCheckPhoneExistService) {}

  async execute(query: AuthRegisterCheckPhoneExistQuery): Promise<{ exist: boolean }> {
    let exist = true;
    try {
      // TODO: validate exist user by email
      exist = await this._userCheckPhoneExist.execute(query.phone);
    } catch (error) {
      if (!(error instanceof UserConflictPhoneException)) throw error;
    }
    return { exist };
  }
}
