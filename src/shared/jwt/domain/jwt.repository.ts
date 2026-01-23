export abstract class IJwtRepository {
  /**
   * @description Generate token
   * @date 2026-01-23 08:36:11
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @template {object} [T=any]
   * @param {T} payload
   * @returns {string}
   */
  abstract generate<T extends object = any>(payload: T): string;

  /**
   * @description Generate token refresh
   * @date 2026-01-23 08:36:31
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @template {object} [T=any]
   * @param {T} payload
   * @returns {string}
   */
  abstract generateRefresh<T extends object = any>(payload: T): string;

  /**
   * @description verify jwt
   * @date 2026-01-23 08:37:03
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @template {object} [T=any]
   * @param {string} token
   * @returns {t}
   */
  abstract verify<T extends object = any>(token: string): T;

  /**
   * @description Verify jwt refresh
   * @date 2026-01-23 08:37:26
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @template {object} [T=any]
   * @param {string} token
   * @returns {T}
   */
  abstract verifyRefresh<T extends object = any>(token: string): T;
}
