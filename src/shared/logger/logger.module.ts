import { Module } from '@nestjs/common';
import { LoggerJob } from './infrastructure/jobs';
import { ILoggerRepository } from './domain/logger.repository';
import { LoggerRepositoryLogger } from './infrastructure/persistences';

@Module({
  providers: [
    LoggerJob,
    {
      provide: ILoggerRepository,
      useClass: LoggerRepositoryLogger,
    },
  ],
  exports: [ILoggerRepository],
})
export class LoggerModule {}
