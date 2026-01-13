import { UserConflictPhoneException } from 'src/contexts/users/domain/exceptions';
import { AuthRegisterConflictPhoneQuery } from './auth-register-conflict-phone.query';
import { UserConflictPhoneService } from 'src/contexts/users/domain/services';

export class AuthRegisterConflictPhoneHandler {
  /**
   * Creates an instance of AuthRegisterCheckPhoneExistHandler.
   * @date 2026-01-05 07:07:59
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserConflictPhoneService} _conflictPhone
   */
  constructor(private readonly _conflictPhone: UserConflictPhoneService) {}

  async execute(query: AuthRegisterConflictPhoneQuery): Promise<{ exist: boolean }> {
    let exist = true;
    try {
      // TODO: validate exist user by phone
      exist = await this._conflictPhone.execute(query.phone);
    } catch (error) {
      if (!(error instanceof UserConflictPhoneException)) throw error;
    }
    return { exist };
  }
}
