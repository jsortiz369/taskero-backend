import { BadRequestException } from '@nestjs/common';

export class TokenNotEqualException extends BadRequestException {
  /**
   * Creates an instance of TokenNotEqualException.
   * @date 2026-01-31 08:09:09
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   */
  constructor() {
    super('Los tokens no son iguales.');
  }
}
