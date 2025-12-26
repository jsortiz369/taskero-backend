import { BooleanValueObject } from 'src/shared/system/domain/vo/booleand.vo';
import { UserPrimitive } from '../user.interface';

type UserConfirmedProps = UserPrimitive['confirmed'];
export class UserConfirmed extends BooleanValueObject<UserConfirmedProps> {
  /**
   * Creates an instance of UserConfirmed.
   * @date 2025-12-25 20:03:44
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserConfirmedProps} value
   */
  constructor(value: UserConfirmedProps) {
    super(value, 'The user confirmed value must be a boolean');
  }
}
