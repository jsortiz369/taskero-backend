import { UnauthorizedException } from '@nestjs/common';

export class UserInfoLockException extends UnauthorizedException {
  /**
   * Creates an instance of UserInfoLockException.
   * @date 2026-01-18 07:55:27
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   */
  constructor() {
    super('Al siguiente intento fallido se bloqueará la cuenta');
  }
}
