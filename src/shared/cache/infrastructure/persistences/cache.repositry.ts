import { Cache } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';

import { ICacheRepository } from '../../domain/cache.repository';

export class CacheRepository implements ICacheRepository {
  /**
   * Creates an instance of CacheRepository.
   * @date 2026-04-10 20:51:48
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {Cache} cacheManager
   */
  constructor(@Inject('CACHE_MANAGER') private readonly cacheManager: Cache) {}

  /**
   * @description get info by key
   * @date 2026-04-10 20:53:54
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @template T
   * @param {string} key
   * @returns {Promise<T | undefined>}
   */
  async get<T>(key: string): Promise<T | undefined> {
    return await this.cacheManager.get<T>(key);
  }

  /**
   * @description create new data by key
   * @date 2026-04-10 20:54:13
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @template T
   * @param {string} key
   * @param {T} value
   * @param {?number} [ttl]
   * @returns {Promise<void>}
   */
  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
    return;
  }

  /**
   * @description delete by key
   * @date 2026-04-10 20:54:19
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {string} key
   * @returns {Promise<void>}
   */
  async delete(key: string): Promise<void> {
    await this.cacheManager.del(key);
    return;
  }
}
