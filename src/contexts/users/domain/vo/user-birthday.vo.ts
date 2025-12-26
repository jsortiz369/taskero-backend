import { DateValueObject } from 'src/shared/system/domain/vo';
import { UserPrimitive } from '../user.interface';

type UserBirthdayProp = UserPrimitive['birthday'];
export class UserBirthday extends DateValueObject<UserBirthdayProp> {
  /**
   * Creates an instance of UserBirthday.
   * @date 2025-12-25 19:35:34
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserBirthdayProp} _value
   */
  constructor(readonly _value: UserBirthdayProp) {
    super(_value, 'The birthday is not valid must be a date');

    this.ensureIsDefined('The birthday is required'); // Not null or undefined
    this.max(new Date(), 'The birthday cannot be in the future'); // Not future date
    this.min(new Date('1900-01-01'), 'The birthday cannot be before 1900'); // Not before 1900
    this.ensureMinimumAge(18, 'The user must be at least 18 years old'); // Minimum age 18
  }

  private ensureMinimumAge(minAge: number, errorMessage: string): void {
    const ageDifMs = Date.now() - this._value.getTime();

    //if (age < minAge) throw new Error(errorMessage);
  }
}
