import { Global, Module } from '@nestjs/common';

import { EnvRepository } from './domain/env.repository';
import { ZodEnvPersistence } from './infrastructure/persistences';

@Global()
@Module({
  providers: [
    {
      provide: EnvRepository,
      useClass: ZodEnvPersistence,
    },
  ],
  exports: [EnvRepository],
})
export class EnvModule {}
