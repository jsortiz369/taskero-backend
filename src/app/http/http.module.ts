import { Module } from '@nestjs/common';

import { LoggerModule } from 'src/shared/logger/logger.module';
import { ILoggerRepository } from 'src/shared/logger/domain/logger.repository';
import { IEnvRepository } from 'src/shared/env/domain/env.repository';
import * as filters from './filters';
import * as interceptors from './interceptors';

@Module({
  imports: [LoggerModule],
  providers: [
    {
      provide: filters.HttpExceptionFilter,
      useFactory: (logger: ILoggerRepository) => new filters.HttpExceptionFilter(logger),
      inject: [ILoggerRepository],
    },
    {
      provide: interceptors.RequestMultipartInterceptor,
      useFactory: (logger: ILoggerRepository) => new interceptors.RequestMultipartInterceptor(logger),
      inject: [ILoggerRepository],
    },
    {
      provide: interceptors.RequestAgentInterceptor,
      useFactory: (envRepository: IEnvRepository) => new interceptors.RequestAgentInterceptor(envRepository),
      inject: [IEnvRepository],
    },
    {
      provide: interceptors.ResponseTimeInterceptor,
      useFactory: (logger: ILoggerRepository) => new interceptors.ResponseTimeInterceptor(logger),
      inject: [ILoggerRepository],
    },
  ],
  exports: [
    filters.HttpExceptionFilter,
    interceptors.RequestMultipartInterceptor,
    interceptors.ResponseTimeInterceptor,
    interceptors.RequestAgentInterceptor,
  ],
})
export class HttpModule {}
