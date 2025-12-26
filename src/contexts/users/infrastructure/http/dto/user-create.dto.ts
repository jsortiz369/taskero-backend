import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

import { REGEX } from 'src/shared/system/domain/constants';

export class UserCreateDto {
  @IsString({ message: 'The names is not valid must be a string' })
  @IsNotEmpty({ message: 'The names is not empty' })
  @Length(1, 50, { message: 'The names must be between 1 and 50 characters' })
  @Matches(REGEX.LETTER_NUMBER_SPACE, { message: 'The names not valid must be letters, numbers and space' })
  readonly names: string;

  @IsString({ message: 'The surnames is not valid must be a string' })
  @IsNotEmpty({ message: 'The surnames is not empty' })
  @Length(1, 50, { message: 'The surnames must be between 1 and 50 characters' })
  @Matches(REGEX.LETTER_NUMBER_SPACE, { message: 'The surnames not valid must be letters, numbers and space' })
  readonly surnames: string;

  @IsDate({ message: 'The birthday is not valid must be a date' })
  @Type(() => Date)
  @IsNotEmpty({ message: 'The birthday is not empty' })
  readonly birthday: Date;

  @IsString({ message: 'The phone is not valid must be a string' })
  @IsNotEmpty({ message: 'The phone is not empty' })
  readonly phone: string;

  @IsString({ message: 'The email is not valid must be a string' })
  @IsNotEmpty({ message: 'The email is not empty' })
  @Matches(REGEX.EMAIL, { message: 'The email not valid must be a email' })
  @Length(1, 100, { message: 'The email must be between 1 and 100 characters' })
  readonly email: string;

  @IsString({ message: 'The password is not valid must be a string' })
  @IsNotEmpty({ message: 'The password is not empty' })
  @Length(8, 20, { message: 'The password must be between 8 and 20 characters' })
  @Matches(REGEX.PASSWORD, {
    message: 'The password not valid. At least one lowercase letter, one uppercase letter, one digit, one special character, length between 8 and 64',
  })
  readonly password: string;
}
