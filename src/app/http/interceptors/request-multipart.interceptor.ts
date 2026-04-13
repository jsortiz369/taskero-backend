import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { MultipartFile } from '@fastify/multipart';
import { Observable } from 'rxjs';
import type { FastifyRequest } from 'fastify';

import { ILoggerRepository } from 'src/shared/logger/domain/logger.repository';

@Injectable()
export class RequestMultipartInterceptor implements NestInterceptor {
  /**
   * Creates an instance of RequestMultipartInterceptor.
   * @date 2025-12-26 06:55:44
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {ILoggerRepository} _logger
   */
  constructor(private readonly _logger: ILoggerRepository) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<CallHandler>> {
    const req = context.switchToHttp().getRequest<FastifyRequest>();

    // check if request is multipart
    if (!req.isMultipart || !req.isMultipart()) return next.handle();

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

    return next.handle();
  }
}
