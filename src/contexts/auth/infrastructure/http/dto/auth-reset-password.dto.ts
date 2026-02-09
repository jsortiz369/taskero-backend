import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

import { UserCreateDto } from 'src/contexts/users/infrastructure/http/dto';

export class AuthResetPasswordDto extends PickType(UserCreateDto, ['password']) {
  @IsString({ message: 'El token no es válido, debe ser cadena de texto.' })
  @IsNotEmpty({ message: 'El token no debe estar vacío.' })
  readonly token: string;
}
