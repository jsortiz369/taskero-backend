import { UnauthorizedException } from '@nestjs/common';

export class NotUnauthorizedException extends UnauthorizedException {
  /**
   * Creates an instance of NotUnauthorizedException.
   * @date 2026-01-31 06:50:13
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   */
  constructor() {
    super('No autorizado: El usuario no ha sido autenticado correctamente.');
  }
}
