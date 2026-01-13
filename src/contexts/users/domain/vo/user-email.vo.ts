import { REGEX } from 'src/shared/system/domain/constants';
import { StringValueObject } from 'src/shared/system/domain/vo';
import { UserPrimitive } from '../user.interface';

type UserEmailProp = UserPrimitive['email'];
export class UserEmail extends StringValueObject<UserEmailProp> {
  /**
   * Creates an instance of UserEmail.
   * @date 2025-12-25 19:45:37
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserEmailProp} value
   */
  constructor(value: UserEmailProp) {
    super(value, 'El correo electrónica no es válido, debe ser cadena de texto.');

    this.ensureIsDefined('El correo electrónica es requerido'); // Not null or undefined
    this.ensureNotEmpty('El correo electrónica no debe estar vacío'); // Not empty string
    this.ensureIsFulfillRegExp(REGEX.EMAIL, 'El correo electrónica no es válido'); // Only letters and numbers
    this.length(1, 100, 'El correo electrónica debe tener entre 1 y 100 caracteres'); // Length between 1 and 100 characters
  }
}
