import { Module } from '@nestjs/common';

import { IUuidRepository } from './domain/uuid.repository';
import { UuidRepositoryV4 } from './infrastructure/persistences';

@Module({
  providers: [
    {
      provide: IUuidRepository,
      useClass: UuidRepositoryV4,
    },
  ],
  exports: [IUuidRepository],
})
export class UuidModule {}
