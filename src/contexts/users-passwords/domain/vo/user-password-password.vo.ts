import { StringValueObject } from 'src/shared/system/domain/vo';
import { UserPasswordPrimitive } from '../user-password.interface';

type UserPasswordPasswordProp = UserPasswordPrimitive['password'];
export class UserPasswordPassword extends StringValueObject<UserPasswordPasswordProp> {
  /**
   * Creates an instance of UserPassword.
   * @date 2025-12-26 21:42:25
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserPasswordPasswordProp} value
   */
  constructor(value: UserPasswordPasswordProp) {
    super(value, 'El valor de la contraseña no es válido'); // Generic string validation

    this.ensureIsDefined('La contraseña es requerida'); // Not null or undefined
    this.ensureNotEmpty('La contraseña no está vacía'); // Not empty string
  }
}
