import { REGEX } from 'src/shared/system/domain/constants';
import { StringValueObject } from 'src/shared/system/domain/vo';
import { UserPrimitive } from '../user.interface';

type UserSurnamesProp = UserPrimitive['surnames'];
export class UserSurnames extends StringValueObject<UserSurnamesProp> {
  /**
   * Creates an instance of UserSurnames.
   * @date 2025-12-25 19:34:15
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserSurnamesProp} value
   */
  constructor(value: UserSurnamesProp) {
    super(value, 'Los apellidos no son válidos, debe ser cadena de texto.', { capitalize: true });

    this.ensureIsDefined('Los apellidos es requerido'); // Not null or undefined
    this.ensureNotEmpty('Los apellidos no deben estar vacíos'); // Not empty string
    this.ensureIsFulfillRegExp(REGEX.LETTER_NUMBER_SPACE, 'Apellidos no válidos, deben ser letras, números y espacios'); // Only letters and numbers
    this.length(1, 50, 'Los apellidos deben tener entre 1 y 50 caracteres'); // Length between 1 and 50 characters
  }
}
