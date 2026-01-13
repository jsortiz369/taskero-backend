import { BadRequestException } from '@nestjs/common';

export class UserBlockedException extends BadRequestException {
  /**
   * Creates an instance of UserBlockedException.
   * @date 2026-01-12 20:40:10
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   */
  constructor() {
    super('El usuario se encuentra bloqueado debido a varios intentos fallidos de inicio de sesión.');
  }
}
