import { HttpException, HttpStatus } from '@nestjs/common';

export class UserLockException extends HttpException {
  /**
   * Creates an instance of UserLockException.
   * @date 2026-01-18 08:06:40
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   */
  constructor() {
    super('La cuenta se encuentra bloqueada por varios intentos fallidos, debe esperar 15 minutos.', HttpStatus.LOCKED);
  }
}
