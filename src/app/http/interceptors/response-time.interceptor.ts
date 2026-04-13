import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Observable, tap } from 'rxjs';

import { ILoggerRepository } from 'src/shared/logger/domain/logger.repository';

export class ResponseTimeInterceptor implements NestInterceptor {
  /**
   * Creates an instance of ResponseTimeInterceptor.
   * @date 2026-04-12 19:31:18
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {ILoggerRepository} _logger
   */
  constructor(private readonly _logger: ILoggerRepository) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest<FastifyRequest>();
    const res = context.switchToHttp().getResponse<FastifyReply>();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - now;
        this._logger.log(`${req.method} ${req.url} ${res.statusCode} ${duration}ms`);
      }),
    );
  }
}
