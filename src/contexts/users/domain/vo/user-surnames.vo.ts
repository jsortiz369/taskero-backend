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
    super(value, 'The surnames is not valid must be a string');

    this.ensureIsDefined('The surnames is required'); // Not null or undefined
    this.ensureNotEmpty('The surnames is not empty'); // Not empty string
    this.ensureIsFulfillRegExp(REGEX.LETTER_NUMBER_SPACE, 'The surnames not valid must be letters, numbers and space'); // Only letters and numbers
    this.length(1, 50, 'The surnames must be between 1 and 50 characters'); // Length between 1 and 50 characters
  }
}
