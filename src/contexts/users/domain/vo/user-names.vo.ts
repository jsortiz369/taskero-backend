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
    super(value, 'The names is not valid must be a string');

    this.ensureIsDefined('The names is required'); // Not null or undefined
    this.ensureNotEmpty('The names is not empty'); // Not empty string
    this.ensureIsFulfillRegExp(REGEX.LETTER_NUMBER_SPACE, 'The names not valid must be letters, numbers and space'); // Only letters and numbers
    this.length(1, 50, 'The names must be between 1 and 50 characters'); // Length between 1 and 50 characters
  }
}
