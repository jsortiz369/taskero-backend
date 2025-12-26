import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { MultipartFile } from '@fastify/multipart';
import { Observable, tap } from 'rxjs';
import type { FastifyRequest } from 'fastify';

import { ILoggerRepository } from 'src/shared/logger/domain/logger.repository';

@Injectable()
export class MultipartBodyInterceptor implements NestInterceptor {
  /**
   * Creates an instance of MultipartBodyInterceptor.
   * @date 2025-12-26 06:55:44
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {ILoggerRepository} _logger
   */
  constructor(private readonly _logger: ILoggerRepository) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest<FastifyRequest>();

    const nextHandle = next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse();
        const statusCode = res.statusCode;
        const duration = Date.now() - now;

        this._logger.log(`${req.method} ${req.url} ${statusCode} ${duration}ms`);
      }),
    );

    // check if request is multipart
    if (!req.isMultipart || !req.isMultipart()) return nextHandle;

    const files: MultipartFile[] = [];
    try {
      for await (const part of req.parts()) {
        if (part.type === 'file') {
          files.push(part);
          await part.toBuffer();
        } else if (part.type === 'field') {
          if (req.body === undefined) req.body = {};
          req.body![part.fieldname] = part.value;
        }
      }
    } catch (error) {
      this._logger.error(`${req.method} ${req.url} ${error.message}`);
    }

    (req as any).files = files;
    (req as any).file = files.length ? files[0] : undefined;

    return nextHandle;
  }
}
