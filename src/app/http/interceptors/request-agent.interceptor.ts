import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';
import { IEnvRepository } from 'src/shared/env/domain/env.repository';
import { UAParser } from 'ua-parser-js';

export class RequestAgentInterceptor implements NestInterceptor {
  /**
   * Creates an instance of RequestAgentInterceptor.
   * @date 2026-04-12 21:04:51
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {IEnvRepository} _envRepository
   */
  constructor(private readonly _envRepository: IEnvRepository) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<FastifyRequest>();

    // Skip if in development environment
    const nodeEnv = this._envRepository.get('NODE_ENV');
    const parser = new UAParser(req.headers['user-agent']);
    const browser = parser.getBrowser();
    const device = parser.getDevice();
    const os = parser.getOS();

    if (nodeEnv === 'production') {
      if (!browser.name) throw new Error('The request must be made through a browser.');
    }

    req.userAgentData = {
      browser: browser.name || 'postman',
      version: browser.version,
      device: device.type || 'desktop',
      os: os.name!,
    };

    return next.handle();
  }
}
