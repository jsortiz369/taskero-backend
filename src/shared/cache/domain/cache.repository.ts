export abstract class ICacheRepository {
  /**
   * @description get info by key
   * @date 2026-04-10 20:48:06
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @template T
   * @param {string} key
   * @returns {Promise<T | undefined>}
   */
  abstract get<T>(key: string): Promise<T | undefined>;

  /**
   * @description create new data by key
   * @date 2026-04-10 20:48:24
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @template T
   * @param {string} key
   * @param {T} value
   * @param {?number} [ttl]
   * @returns {Promise<void>}
   */
  abstract set<T>(key: string, value: T, ttl?: number): Promise<void>;

  /**
   * @description delete by key
   * @date 2026-04-10 20:48:55
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {string} key
   * @returns {Promise<void>}
   */
  abstract delete(key: string): Promise<void>;
}
