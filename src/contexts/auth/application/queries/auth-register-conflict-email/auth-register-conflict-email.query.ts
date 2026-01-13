import { UserPrimitive } from 'src/contexts/users/domain/user.interface';

export class AuthRegisterConflictEmailQuery {
  /**
   * Creates an instance of AuthRegisterConflictEmailQuery.
   * @date 2026-01-05 06:32:09
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {NonNullable<Required<UserPrimitive['email']>>} email
   */
  constructor(public readonly email: NonNullable<Required<UserPrimitive['email']>>) {}
}
