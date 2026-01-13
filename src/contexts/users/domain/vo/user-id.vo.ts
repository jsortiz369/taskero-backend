import { UuidValueObject } from 'src/shared/system/domain/vo';
import { UserPrimitive } from '../user.interface';

type UserIdProp = UserPrimitive['_id'];
export class UserId extends UuidValueObject {
  /**
   * Creates an instance of UserId.
   * @date 2025-12-25 17:07:37
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserIdProp} value
   */
  constructor(value: UserIdProp) {
    super(value, 'El id del usuario no es válido, debe ser un uuid.'); // Validate UUID format
  }
}
