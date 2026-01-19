import { UnauthorizedException } from '@nestjs/common';

export class UserLockException extends UnauthorizedException {
  /**
   * Creates an instance of UserLockException.
   * @date 2026-01-18 08:06:40
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   */
  constructor() {
    super('La cuenta se encuentra bloqueada por varios intentos fallidos.');
  }
}
