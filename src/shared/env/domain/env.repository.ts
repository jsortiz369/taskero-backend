import { Env } from './env.interface';

export abstract class EnvRepository {
  dataBaseUrl: string;

  /**
   * @description Get environment variable by key
   * @date 2025-12-21 20:36:26
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @template {keyof Env} T
   * @param {T} key
   * @returns {Env[T]}
   */
  abstract get<T extends keyof Env>(key: T): Env[T];

  /**
   * @description Get system variable by key
   * @date 2025-12-21 20:36:34
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {string} key
   * @returns {string}
   */
  abstract getSystem(key: string): string;
}
