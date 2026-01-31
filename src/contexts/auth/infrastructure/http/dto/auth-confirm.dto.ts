import { IsNotEmpty, IsString } from 'class-validator';

export class AuthConfirmDto {
  @IsString({ message: 'El código de confirmación no es válido, debe ser cadena de texto.' })
  @IsNotEmpty({ message: 'El código de confirmación no debe estar vacío.' })
  otp: string;
}
