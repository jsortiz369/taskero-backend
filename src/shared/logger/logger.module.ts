import { Module } from '@nestjs/common';
import { LoggerJob } from './infrastructure/jobs';
import { LoggerRepository } from './domain/logger.repository';
import { LoggerPersistence } from './infrastructure/persistences';

@Module({
  providers: [
    LoggerJob,
    {
      provide: LoggerRepository,
      useClass: LoggerPersistence,
    },
  ],
  exports: [LoggerRepository],
})
export class LoggerModule {}
