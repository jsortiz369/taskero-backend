import { Global, Module } from '@nestjs/common';

import { LoggerModule } from '../logger/logger.module';
import { PrismaRepository } from './infrastructure/persistences';
import { IEnvRepository } from '../env/domain/env.repository';
import { ILoggerRepository } from '../logger/domain/logger.repository';

@Global()
@Module({
  imports: [LoggerModule],
  providers: [
    {
      provide: PrismaRepository,
      useFactory: (logger: ILoggerRepository, env: IEnvRepository) => new PrismaRepository(logger, env),
      inject: [ILoggerRepository, IEnvRepository],
    },
  ],
  exports: [PrismaRepository],
})
export class DatabaseModule {}
