import { UserPrimitive } from 'src/contexts/users/domain/user.interface';

export class AuthRegisterCheckEmailExistQuery {
  /**
   * Creates an instance of AuthRegisterEmailExistQuery.
   * @date 2026-01-05 06:32:09
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {NonNullable<Required<UserPrimitive['email']>>} email
   */
  constructor(public readonly email: NonNullable<Required<UserPrimitive['email']>>) {}
}
