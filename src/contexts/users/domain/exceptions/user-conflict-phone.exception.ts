import { ConflictException } from '@nestjs/common';

export class UserConflictPhoneException extends ConflictException {
  /**
   * Creates an instance of UserConflictPhoneException.
   * @date 2025-12-25 20:55:41
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   */
  constructor() {
    super('Ya existe un usuario con este teléfono.');
  }
}
