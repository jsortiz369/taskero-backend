import { Module } from '@nestjs/common';

import { LoggerModule } from 'src/shared/logger/logger.module';
import { ILoggerRepository } from 'src/shared/logger/domain/logger.repository';
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
      provide: interceptors.MultipartBodyInterceptor,
      useFactory: (logger: ILoggerRepository) => new interceptors.MultipartBodyInterceptor(logger),
      inject: [ILoggerRepository],
    },
  ],
  exports: [filters.HttpExceptionFilter, interceptors.MultipartBodyInterceptor],
})
export class HttpModule {}
