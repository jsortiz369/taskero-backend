import { REGEX } from 'src/shared/system/domain/constants';
import { StringValueObject } from 'src/shared/system/domain/vo';
import { UserPrimitive } from '../user.interface';

type UserNamesProp = UserPrimitive['names'];
export class UserNames extends StringValueObject<UserNamesProp> {
  /**
   * Creates an instance of UserNames.
   * @date 2025-12-25 17:08:36
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserNamesProp} value
   */
  constructor(value: UserNamesProp) {
    super(value, 'Los nombres no son válidos, debe ser cadena de texto.', { capitalize: true });

    this.ensureIsDefined('Los nombres es requerido.'); // Not null or undefined
    this.ensureNotEmpty('Los nombres no deben estar vacíos.'); // Not empty string
    this.ensureIsFulfillRegExp(REGEX.LETTER_NUMBER_SPACE, 'Nombres no válidos, deben ser letras, números y espacios.'); // Only letters and numbers
    this.length(1, 50, 'Los nombres deben tener entre 1 y 50 caracteres.'); // Length between 1 and 50 characters
  }
}
