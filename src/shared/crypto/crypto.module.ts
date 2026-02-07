import { Module } from '@nestjs/common';

import { ICryptoRepository } from './domain/crypto.repository';
import { CryptoRepository } from './infrastructure/persistences';

@Module({
  providers: [
    {
      provide: ICryptoRepository,
      useClass: CryptoRepository,
    },
  ],
  exports: [ICryptoRepository],
})
export class CryptoModule {}
