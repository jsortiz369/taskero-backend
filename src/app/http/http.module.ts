import { Module } from '@nestjs/common';

import { LoggerRepository } from 'src/shared/logger/domain/logger.repository';
import { LoggerModule } from 'src/shared/logger/logger.module';
import * as filters from './filters';
import * as interceptors from './interceptors';

@Module({
  imports: [LoggerModule],
  providers: [
    {
      provide: filters.HttpExceptionFilter,
      useFactory: (logger: LoggerRepository) => new filters.HttpExceptionFilter(logger),
      inject: [LoggerRepository],
    },
    {
      provide: interceptors.MultipartBodyInterceptor,
      useFactory: (logger: LoggerRepository) => new interceptors.MultipartBodyInterceptor(logger),
      inject: [LoggerRepository],
    },
  ],
  exports: [filters.HttpExceptionFilter, interceptors.MultipartBodyInterceptor],
})
export class HttpModule {}
