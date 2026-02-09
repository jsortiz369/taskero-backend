import { NotFoundException } from '@nestjs/common';

export class UserNotExistException extends NotFoundException {
  /**
   * Creates an instance of UserNotExistException.
   * @date 2026-02-08 14:21:08
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   */
  constructor() {
    super('El usuario no existe.');
  }
}
