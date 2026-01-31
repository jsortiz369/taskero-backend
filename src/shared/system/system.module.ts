import { Global, Module } from '@nestjs/common';

import { ITimezoneRepository } from './domain/repositories';
import { TimezoneRepository } from './infrastructure/persistences';

@Global()
@Module({
  providers: [
    {
      provide: ITimezoneRepository,
      useClass: TimezoneRepository,
    },
  ],
  exports: [ITimezoneRepository],
})
export class SystemModule {}
