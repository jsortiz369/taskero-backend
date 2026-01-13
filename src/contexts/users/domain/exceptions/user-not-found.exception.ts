import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  /**
   * Creates an instance of UserNotFoundException.
   * @date 2025-12-25 20:57:03
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   */
  constructor() {
    super('No se ha encontrado el usuario.');
  }
}
