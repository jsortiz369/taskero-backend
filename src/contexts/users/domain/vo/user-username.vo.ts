import { StringValueObject } from 'src/shared/system/domain/vo';
import { UserPrimitive } from '../user.interface';
import { REGEX } from 'src/shared/system/domain/constants';

type UserUsernameProp = UserPrimitive['username'];
export class UserUsername extends StringValueObject<UserUsernameProp> {
  /**
   * Creates an instance of UserUsername.
   * @date 2026-01-12 17:23:23
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserUsernameProp} _value
   */
  constructor(readonly _value: UserUsernameProp) {
    super(_value, 'El nombre de usuario no es válido debe ser de cadena de texto');

    this.ensureIsDefined('El nombre de usuario es requerido'); // Not null or undefined
    this.ensureNotEmpty('El nombre de usuario no debe estar vacío'); // Not empty string
    this.length(1, 20, 'El nombre de usuario debe tener entre 1 y 20 caracteres'); // Length between 1 and 50 characters
    this.ensureIsFulfillRegExp(REGEX.USERNAME, 'El nombre de usuario no es válido');
  }
}
