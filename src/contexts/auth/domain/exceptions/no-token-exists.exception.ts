import { NotFoundException } from '@nestjs/common';

export class NoTokenExistsException extends NotFoundException {
  /**
   * Creates an instance of NoTokenExistsException.
   * @date 2026-04-10 21:46:29
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   */
  constructor() {
    super('El código de verificación no es válido o ha expirado. Solicita uno nuevo.');
  }
}
