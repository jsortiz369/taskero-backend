import { Module } from '@nestjs/common';
import { IBcryptRepository } from './domain/bcrypt.repository';
import { BcryptRepository } from './infrastructure/persistences';

@Module({
  providers: [
    {
      provide: IBcryptRepository,
      useClass: BcryptRepository,
    },
  ],
  exports: [IBcryptRepository],
})
export class BcryptModule {}
