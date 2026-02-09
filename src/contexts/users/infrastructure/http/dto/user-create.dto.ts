import { IsNotEmpty, IsString, Matches } from 'class-validator';

import { REGEX } from 'src/shared/system/domain/constants';

export class UserCreateDto {
  @IsString({ message: 'Los nombres no son válidos, debe ser cadena de texto.' })
  @IsNotEmpty({ message: 'Los nombres no deben estar vacíos.' })
  readonly names: string;

  @IsString({ message: 'Los apellidos no son válidos, debe ser cadena de texto.' })
  @IsNotEmpty({ message: 'Los apellidos no deben estar vacíos.' })
  readonly surnames: string;

  @IsString({ message: 'El nombre de usuario no es válido, debe ser cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre de usuario no debe estar vacío.' })
  readonly username: string;

  @IsString({ message: 'El teléfono no es válido, debe ser cadena de texto.' })
  @IsNotEmpty({ message: 'El teléfono no debe estar vacío.' })
  readonly phone: string;

  @IsString({ message: 'El correo electrónico no es válido, debe ser cadena de texto.' })
  @IsNotEmpty({ message: 'El correo electrónico no debe estar vacío.' })
  @Matches(REGEX.EMAIL, { message: 'El correo electrónico no es válido.' })
  readonly email: string;

  @IsString({ message: 'La contraseña no es válida, debe ser cadena de texto.' })
  @IsNotEmpty({ message: 'La contraseña no debe estar vacía.' })
  @Matches(REGEX.PASSWORD, {
    message:
      'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial. El largo debe ser de 8 a 64 caracteres.',
  })
  readonly password: string;
}
