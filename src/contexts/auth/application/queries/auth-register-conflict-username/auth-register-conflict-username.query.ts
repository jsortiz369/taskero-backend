import { UserPrimitive } from 'src/contexts/users/domain/user.interface';

export class AuthRegisterConflictUsernameQuery {
  /**
   * Creates an instance of AuthRegisterConflictUsernameQuery.
   * @date 2026-01-12 20:41:44
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {NonNullable<Required<UserPrimitive['username']>>} username
   */
  constructor(public readonly username: NonNullable<Required<UserPrimitive['username']>>) {}
}
