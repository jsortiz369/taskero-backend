import { REGEX } from 'src/shared/system/domain/constants';
import { StringValueObject } from 'src/shared/system/domain/vo';
import { UserPrimitive } from '../user.interface';

type UserPhoneProp = UserPrimitive['phone'];
export class UserPhone extends StringValueObject<UserPhoneProp> {
  /**
   * Creates an instance of UserPhone.
   * @date 2025-12-25 19:42:35
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserPhoneProp} value
   */
  constructor(value: UserPhoneProp) {
    super(value, 'El teléfono no es válido, debe ser cadena de texto.');

    this.ensureNotEmpty('El teléfono no debe estar vacío'); // Not empty string
    this.ensureIsFulfillRegExp(REGEX.PHONE, 'El teléfono no es válido'); // Only letters and numbers
  }
}
