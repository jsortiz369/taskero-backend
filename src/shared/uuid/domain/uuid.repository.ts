export abstract class UuidRepository {
  /**
   * @description Generate uuid
   * @date 2025-12-21 20:37:51
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @returns {string}
   */
  abstract generateUuid(): string;

  /**
   * @description Validate uuid
   * @date 2025-12-21 20:37:59
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {string} uuid
   * @returns {boolean}
   */
  abstract validateUuid(uuid: string): boolean;
}
