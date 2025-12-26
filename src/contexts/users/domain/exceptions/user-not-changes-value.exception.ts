import { BadRequestException } from '@nestjs/common';

export class UserNotChangesValueException extends BadRequestException {
  /**
   * Creates an instance of UserNotChangesValueException.
   * @date 2025-12-25 20:56:55
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   */
  constructor() {
    super('User not changes value');
  }
}
