import { BadRequestException } from '@nestjs/common';

export class UserPasswordConflictCreatePasswordException extends BadRequestException {
  /**
   * Creates an instance of UserPasswordConflictCreatePasswordException.
   * @date 2026-02-08 17:55:24
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   */
  constructor() {
    super('Por seguridad, no se puede reutilizar ninguna de sus últimas 3 contraseñas.');
  }
}
