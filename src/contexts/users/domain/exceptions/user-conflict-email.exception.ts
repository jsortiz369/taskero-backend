import { ConflictException } from '@nestjs/common';

export class UserConflictEmailException extends ConflictException {
  /**
   * Creates an instance of UserConflictEmailException.
   * @date 2025-12-25 20:55:15
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   */
  constructor() {
    super('Ya existe un usuario con este correo.');
  }
}
