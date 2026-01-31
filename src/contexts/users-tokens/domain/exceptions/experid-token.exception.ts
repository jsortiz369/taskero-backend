import { GoneException } from '@nestjs/common';

export class TokenExpiredException extends GoneException {
  /**
   * Creates an instance of TokenExpiredException.
   * @date 2026-01-31 07:58:31
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   */
  constructor() {
    super('El token ha expirado.');
  }
}
