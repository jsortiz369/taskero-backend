import { BadRequestException } from '@nestjs/common';

export class TokenNotEqualException extends BadRequestException {
  /**
   * Creates an instance of TokenNotEqualException.
   * @date 2026-04-10 21:48:38
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   */
  constructor() {
    super('El código de verificación es incorrecto.');
  }
}
