import { UserConflictEmailException } from 'src/contexts/users/domain/exceptions';
import { AuthRegisterConflictEmailQuery } from './auth-register-conflict-email.query';
import { UserConflictEmailService } from 'src/contexts/users/domain/services';

export class AuthRegisterConflictEmailHandler {
  /**
   * Creates an instance of AuthRegisterConflictEmailHandler.
   * @date 2026-01-05 07:00:18
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserConflictEmailService} _conflictEmail
   */
  constructor(private readonly _conflictEmail: UserConflictEmailService) {}

  async execute(query: AuthRegisterConflictEmailQuery): Promise<{ exist: boolean }> {
    let exist = true;
    try {
      // TODO: validate exist user by email
      exist = await this._conflictEmail.execute(query.email);
    } catch (error) {
      if (!(error instanceof UserConflictEmailException)) throw error;
    }
    return { exist };
  }
}
