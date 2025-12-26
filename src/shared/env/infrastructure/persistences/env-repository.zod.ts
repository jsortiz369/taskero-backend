import { config } from 'dotenv';
import { ZodSafeParseResult } from 'zod';

import { Env } from '../../domain/env.interface';
import { ZodEnvSchema } from '../schemas';
import { IEnvRepository } from '../../domain/env.repository';

export class EnvRepositoryZod implements IEnvRepository {
  private readonly _env: Env;

  /**
   * Creates an instance of EnvRepositoryZod.
   * @date 2025-12-26 06:41:50
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   */
  constructor() {
    const resultEnv = config({ path: `.env` });
    if (resultEnv?.error instanceof Error) throw new Error(`Could not find .env file`);
    const parsedConfig: ZodSafeParseResult<Env> = ZodEnvSchema.safeParse(resultEnv.parsed);
    if (parsedConfig.error && !parsedConfig.data) throw new Error(`${parsedConfig.error._zod.def.map((e) => e.message).join(', ')}`);
    this._env = parsedConfig.data;
  }

  get dataBaseUrl(): string {
    const host = this._env['DB_HOST'];
    const port = this._env['DB_PORT'];
    const name = this._env['DB_NAME'];
    const username = this._env['DB_USERNAME'];
    const password = this._env['DB_PASSWORD'];

    return `postgresql://${username}:${password}@${host}:${port}/${name}`;
  }

  /**
   * @description Get environment variable by key
   * @date 2025-12-26 06:41:58
   * @author Jogan Ortiz Muñoz
   *
   * @template {keyof Env} T
   * @param {T} key
   * @returns {Env[T]}
   */
  get<T extends keyof Env>(key: T): Env[T] {
    this.validateKey(key);
    const value = this._env[key];
    return value;
  }

  /**
   * @description Get system variable by key
   * @date 2025-12-26 06:42:06
   * @author Jogan Ortiz Muñoz
   *
   * @template {string} T
   * @param {T} key
   * @returns {string}
   */
  getSystem<T extends string>(key: T): string {
    this.validateKey(key);
    return process.env[key] as string;
  }

  /**
   * @description Validate key exist
   * @date 2025-12-26 06:42:15
   * @author Jogan Ortiz Muñoz
   *
   * @private
   * @template {string} T
   * @param {T} value
   * @returns {boolean}
   */
  private validateKey<T extends string>(value: T): boolean {
    if (value === undefined || value === null) throw new Error(`Key variable is not defined`);
    return true;
  }
}
