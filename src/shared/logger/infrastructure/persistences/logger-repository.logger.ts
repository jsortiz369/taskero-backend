import { Logger } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

import { ILoggerRepository } from '../../domain/logger.repository';
import { IEnvRepository } from 'src/shared/env/domain/env.repository';

export class LoggerRepositoryLogger implements ILoggerRepository {
  private readonly logger: Logger = new Logger();

  /**
   * Creates an instance of LoggerRepositoryLogger.
   * @date 2026-04-12 21:04:59
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {IEnvRepository} _envRepository
   */
  constructor(private readonly _envRepository: IEnvRepository) {}

  /**
   * @description show the messages
   * @date 2025-12-26 06:45:59
   * @author Jogan Ortiz Muñoz
   *
   * @param {*} message
   * @param {?string} [context]
   */
  log(message: any, context?: string) {
    if (context) this.logger.log(message, context);
    else this.logger.log(message);

    // create file
    this.createFile(typeof message === 'string' ? message : JSON.stringify(message), 'log');
  }

  /**
   * @description Show error messages
   * @date 2025-12-26 06:46:05
   * @author Jogan Ortiz Muñoz
   *
   * @param {*} message
   * @param {?string} [stack]
   * @param {?string} [context]
   */
  error(message: any, stack?: string, context?: string) {
    if (context) this.logger.error(message, undefined, context);
    else this.logger.error(message);

    // create file
    if (typeof message !== 'string') message = JSON.stringify(message);
    this.createFile(stack ? `${message} ${stack}` : message, 'error');
  }

  /**
   * @description show warning messages
   * @date 2025-12-26 06:46:13
   * @author Jogan Ortiz Muñoz
   *
   * @param {*} message
   * @param {?string} [context]
   */
  warn(message: any, context?: string) {
    if (context) this.logger.warn(message, undefined, context);
    else this.logger.warn(message);

    this.createFile(typeof message === 'string' ? message : JSON.stringify(message), 'warn');
  }

  /**
   * @description Create file messages
   * @date 2025-12-26 06:46:21
   * @author Jogan Ortiz Muñoz
   *
   * @private
   * @param {*} text
   * @param {('error' | 'warn' | 'log')} [type='log']
   */
  private createFile(text: any, type: 'error' | 'warn' | 'log' = 'log') {
    const nodeEnv = this._envRepository.get('NODE_ENV');
    if (nodeEnv === 'production' && type !== 'error') return;

    const uploadPath = path.join(process.cwd(), 'logs');

    // validate exist folder
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

    const date = new Date().toLocaleString().replaceAll('/', '-');
    const filePath = path.join(uploadPath, `${date.split(',')[0]}.log`);

    const icon = type === 'error' ? '🚨' : type === 'warn' ? '⚠️' : '📝';
    const textLog = `[${date}] ${icon} ${type.toUpperCase()} ${text} \n`;
    const existFile = fs.existsSync(filePath);
    if (!existFile) fs.writeFileSync(filePath, textLog, 'utf-8');
    else fs.appendFileSync(filePath, textLog);
  }
}
