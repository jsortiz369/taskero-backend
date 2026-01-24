import { UnauthorizedException } from '@nestjs/common';

export class UserOrPasswordNotCorrectException extends UnauthorizedException {
  /**
   * Creates an instance of UserOrPasswordNotCorrectException.
   * @date 2026-01-17 17:36:40
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   */
  constructor() {
    super('Usuario y/o contraseña incorrecto.');
  }
}
