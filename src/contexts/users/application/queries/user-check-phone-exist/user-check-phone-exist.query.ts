import { UserPrimitive } from 'src/contexts/users/domain/user.interface';

export class UserCheckPhoneExistQuery {
  /**
   * Creates an instance of UserCheckPhoneExistQuery.
   * @date 2025-12-26 21:20:54
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {NonNullable<Required<UserPrimitive['email']>>} phone
   * @param {Partial<Pick<UserPrimitive, '_id'>>['_id']} _id
   */
  constructor(
    public readonly phone: NonNullable<Required<UserPrimitive['phone']>>,
    public readonly _id: Partial<Pick<UserPrimitive, '_id'>>['_id'],
  ) {}
}
