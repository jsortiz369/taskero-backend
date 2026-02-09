import { BadRequestException } from '@nestjs/common';

export class TokenUsedException extends BadRequestException {
  /**
   * Creates an instance of TokenUsedException.
   * @date 2026-02-08 20:53:41
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   */
  constructor() {
    super('El código de verificación ya ha sido utilizado.');
  }
}
