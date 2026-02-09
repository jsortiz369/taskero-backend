export abstract class IBcryptRepository {
  /**
   * @description Encrypt password
   * @date 2025-12-26 06:38:47
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {string} password
   * @returns {Promise<string>}
   */
  abstract hash(password: string): Promise<string>;

  /**
   * @description Compare if equal password
   * @date 2025-12-26 06:38:55
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {string} password
   * @param {string} hash
   * @returns {Promise<boolean>}
   */
  abstract compare(password: string, hash: string): Promise<boolean>;
}
