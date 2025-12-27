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
    super(value, 'The password is not valid must be a string');

    this.ensureIsDefined('The password is required'); // Not null or undefined
    this.ensureNotEmpty('The password is not empty'); // Not empty string
  }
}
