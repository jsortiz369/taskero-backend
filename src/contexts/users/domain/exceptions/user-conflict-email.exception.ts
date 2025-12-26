import { BadRequestException } from '@nestjs/common';

export class UserConflictEmailException extends BadRequestException {
  /**
   * Creates an instance of UserConflictEmailException.
   * @date 2025-12-25 20:55:15
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   */
  constructor() {
    super('User exist by email');
  }
}
