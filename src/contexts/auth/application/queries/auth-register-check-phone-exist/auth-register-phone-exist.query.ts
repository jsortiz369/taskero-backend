import { UserPrimitive } from 'src/contexts/users/domain/user.interface';

export class AuthRegisterCheckPhoneExistQuery {
  /**
   * Creates an instance of AuthRegisterCheckPhoneExistQuery.
   * @date 2026-01-05 07:04:43
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {NonNullable<Required<UserPrimitive['phone']>>} phone
   */
  constructor(public readonly phone: NonNullable<Required<UserPrimitive['phone']>>) {}
}
