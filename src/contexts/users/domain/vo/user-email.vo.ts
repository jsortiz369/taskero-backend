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
    super(value, 'The email is not valid must be a string');

    this.ensureIsDefined('The email is required'); // Not null or undefined
    this.ensureNotEmpty('The email is not empty'); // Not empty string
    this.ensureIsFulfillRegExp(REGEX.EMAIL, 'The email not valid must be a email'); // Only letters and numbers
    this.length(1, 100, 'The email must be between 1 and 100 characters'); // Length between 1 and 100 characters
  }
}
