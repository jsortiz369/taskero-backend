import { HttpException, HttpStatus } from '@nestjs/common';

export class UserInactiveException extends HttpException {
  /**
   * Creates an instance of UserInactiveException.
   * @date 2026-01-23 11:39:36
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   */
  constructor() {
    super('El usuario se encuentra inactivo.', HttpStatus.LOCKED);
  }
}
