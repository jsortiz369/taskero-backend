export abstract class IUuidRepository {
  /**
   * @description Generate uuid
   * @date 2025-12-26 06:47:03
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @returns {string}
   */
  abstract generateUuid(): string;

  /**
   * @description Validate uuid
   * @date 2025-12-26 06:47:11
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {string} uuid
   * @returns {boolean}
   */
  abstract validateUuid(uuid: string): boolean;
}
