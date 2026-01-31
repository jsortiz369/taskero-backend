import { NotFoundException } from '@nestjs/common';

export class NoTokenExistsException extends NotFoundException {
  /**
   * Creates an instance of NoTokenExistsException.
   * @date 2026-01-31 07:50:28
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   */
  constructor() {
    super('No existe un token para este usuario.');
  }
}
