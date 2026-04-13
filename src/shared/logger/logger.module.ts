import { Module } from '@nestjs/common';

import { LoggerJob } from './infrastructure/jobs';
import { ILoggerRepository } from './domain/logger.repository';
import { LoggerRepositoryLogger } from './infrastructure/persistences';
import { IEnvRepository } from '../env/domain/env.repository';

@Module({
  providers: [
    LoggerJob,
    {
      provide: ILoggerRepository,
      useFactory: (env: IEnvRepository) => new LoggerRepositoryLogger(env),
      inject: [IEnvRepository],
    },
  ],
  exports: [ILoggerRepository],
})
export class LoggerModule {}
