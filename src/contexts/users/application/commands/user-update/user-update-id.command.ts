import { UserPrimitive } from 'src/contexts/users/domain/user.interface';

export class UserUpdateIdCommand {
  /**
   * Creates an instance of UserUpdateIdCommand.
   * @date 2025-12-26 10:51:03
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {NonNullable<UserPrimitive['_id']>} _id
   */
  constructor(readonly _id: NonNullable<UserPrimitive['_id']>) {}
}
