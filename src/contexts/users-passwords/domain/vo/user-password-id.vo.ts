import { UuidValueObject } from 'src/shared/system/domain/vo';
import { UserPasswordPrimitive } from '../user-password.interface';

type UserPasswordIdProp = UserPasswordPrimitive['_id'];
export class UserPasswordId extends UuidValueObject {
  /**
   * Creates an instance of UserPasswordId.
   * @date 2025-12-26 21:40:29
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserPasswordIdProp} value
   */
  constructor(value: UserPasswordIdProp) {
    super(value, 'El id de la contraseña no es válido, debe ser un uuid.'); // Validate UUID format
  }
}
