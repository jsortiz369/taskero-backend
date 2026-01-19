import { IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginDto {
  @IsString({ message: 'El nombre de usuario no es válido, debe ser cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre de usuario no debe estar vacío.' })
  username: string;

  @IsString({ message: 'La contraseña no es válida, debe ser cadena de texto.' })
  @IsNotEmpty({ message: 'La contraseña no debe estar vacía.' })
  password: string;
}
