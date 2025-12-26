import { UserPrimitive } from 'src/contexts/users/domain/user.interface';

export class UserDeleteIdCommand {
  /**
   * Creates an instance of UserDeleteIdCommand.
   * @date 2025-12-26 08:10:34
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {NonNullable<UserPrimitive['_id']>} _id
   */
  constructor(readonly _id: NonNullable<UserPrimitive['_id']>) {}
}
