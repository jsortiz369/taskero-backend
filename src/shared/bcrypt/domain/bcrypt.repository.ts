export abstract class IBcryptRepository {
  /**
   * @description Encrypt password
   * @date 2025-12-26 06:38:47
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {string} password
   * @param {?(string | number)} [saltOrRounds]
   * @returns {Promise<string>}
   */
  abstract hash(password: string, saltOrRounds?: string | number): Promise<string>;

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

  /**
   * @description Generate salt by encrypt password
   * @date 2025-12-26 06:39:02
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @returns {string}
   */
  abstract generateSalt(): string;
}
