import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';

import { UserCreateDto } from './user-create.dto';
import { Transform } from 'class-transformer';

export class UserUpdateDto extends PartialType(OmitType(UserCreateDto, ['email', 'password', 'phone'] as const)) {
  @IsOptional()
  @Transform(({ value }): boolean => (value === 'true' ? true : value === 'false' ? false : value))
  @IsBoolean({ message: 'The isConfirmed is not valid must be a boolean' })
  readonly status?: boolean;

  @IsOptional()
  @Transform(({ value }): boolean => (value === 'true' ? true : value === 'false' ? false : value))
  @IsBoolean({ message: 'The isConfirmed is not valid must be a boolean' })
  readonly isConfirmed?: boolean;
}
