import { BadRequestException } from '@nestjs/common';

export class UserConflictPhoneException extends BadRequestException {
  /**
   * Creates an instance of UserConflictPhoneException.
   * @date 2025-12-25 20:55:41
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   */
  constructor() {
    super('User exist by phone');
  }
}
