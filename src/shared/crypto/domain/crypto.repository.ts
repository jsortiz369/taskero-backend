export abstract class ICryptoRepository {
  /**
   * @description Generate uuid v4
   * @date 2026-02-07 07:17:35
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @returns {string}
   */
  abstract generateUuidV4(): string;

  /**
   * @description Validate uuid v4
   * @date 2026-02-07 07:15:04
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {string} uuid
   * @returns {boolean}
   */
  abstract validateIsUuidV4(uuid: string): boolean;

  /**
   * @description generate crypt
   * @date 2026-02-07 07:16:16
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {number} bytes
   * @returns {string}
   */
  abstract generateCrypt(bytes: number): string;
}
