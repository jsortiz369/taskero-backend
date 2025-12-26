import { Global, Module } from '@nestjs/common';

import { IEnvRepository } from './domain/env.repository';
import { EnvRepositoryZod } from './infrastructure/persistences';

@Global()
@Module({
  providers: [
    {
      provide: IEnvRepository,
      useClass: EnvRepositoryZod,
    },
  ],
  exports: [IEnvRepository],
})
export class EnvModule {}
