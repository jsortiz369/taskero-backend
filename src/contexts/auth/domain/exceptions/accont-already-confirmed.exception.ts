import { ConflictException } from '@nestjs/common';

export class AccountAlreadyConfirmedException extends ConflictException {
  /**
   * Creates an instance of AccountAlreadyConfirmedException.
   * @date 2026-01-31 07:33:53
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   */
  constructor() {
    super('La cuenta ya ha sido confirmada previamente.');
  }
}
