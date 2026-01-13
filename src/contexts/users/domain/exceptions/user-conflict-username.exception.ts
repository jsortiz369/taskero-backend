import { ConflictException } from '@nestjs/common';

export class UserConflictUsernameException extends ConflictException {
  /**
   * Creates an instance of UserConflictUsernameException.
   * @date 2026-01-12 20:40:15
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   */
  constructor() {
    super('Ya existe un usuario con este nombre de usuario.');
  }
}
