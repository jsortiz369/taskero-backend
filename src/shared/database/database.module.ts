import { Module } from '@nestjs/common';

import { LoggerModule } from '../logger/logger.module';
import { EnvModule } from '../env/env.module';
import { PrismaPersistence } from './infrastructure/persistences';
import { EnvRepository } from '../env/domain/env.repository';
import { LoggerRepository } from '../logger/domain/logger.repository';

@Module({
  imports: [LoggerModule, EnvModule],
  providers: [
    {
      provide: PrismaPersistence,
      useFactory: (logger: LoggerRepository, env: EnvRepository) => new PrismaPersistence(logger, env),
      inject: [LoggerRepository, EnvRepository],
    },
  ],
  exports: [PrismaPersistence],
})
export class DatabaseModule {}
