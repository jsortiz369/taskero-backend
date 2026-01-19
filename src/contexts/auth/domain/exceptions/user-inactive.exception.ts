import { HttpException, HttpStatus } from '@nestjs/common';

export class UserInactiveException extends HttpException {
  constructor() {
    super('El usuario se encuentra inactivo.', HttpStatus.LOCKED);
  }
}
