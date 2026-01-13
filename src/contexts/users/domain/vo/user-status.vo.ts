import { BooleanValueObject } from 'src/shared/system/domain/vo/booleand.vo';
import { UserPrimitive } from '../user.interface';

type UserStatusProps = UserPrimitive['status'];
export class UserStatus extends BooleanValueObject<UserStatusProps> {
  /**
   * Creates an instance of UserStatus.
   * @date 2025-12-25 20:05:04
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserStatusProps} value
   */
  constructor(value: UserStatusProps) {
    super(value, 'El estado del usuario no es válido, debe ser true o false.');
  }
}
