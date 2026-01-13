import { UserConflictUsernameException } from 'src/contexts/users/domain/exceptions';
import { AuthRegisterConflictUsernameQuery } from './auth-register-conflict-username.query';
import { UserConflictUsernameService } from 'src/contexts/users/domain/services';

export class AuthRegisterConflictUsernameHandler {
  /**
   * Creates an instance of AuthRegisterConflictUsernameHandler.
   * @date 2026-01-12 20:43:53
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserConflictUsernameService} _conflictUsername
   */
  constructor(private readonly _conflictUsername: UserConflictUsernameService) {}

  async execute(query: AuthRegisterConflictUsernameQuery): Promise<{ exist: boolean }> {
    let exist = true;
    try {
      // TODO: validate exist user by username
      exist = await this._conflictUsername.execute(query.username);
    } catch (error) {
      if (!(error instanceof UserConflictUsernameException)) throw error;
    }
    return { exist };
  }
}
