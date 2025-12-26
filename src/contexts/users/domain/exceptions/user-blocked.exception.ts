import { BadRequestException } from '@nestjs/common';

export class UserBlockedException extends BadRequestException {
  constructor() {
    super('User is blocked due to multiple failed login attempts. Please try again later.');
  }
}
