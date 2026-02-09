import { TokenBytes, TokenOptions } from './crypto.interface';

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
   * @description Generate token for number or alfanumeric length default for number 6 and alfanumeric 32 bytes
   * @date 2026-02-08 15:11:45
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {TokenOptions} [options]
   * @returns {string}
   */
  abstract token(options: TokenOptions): string;

  /**
   * @description generate crypt
   * @date 2026-02-07 07:16:16
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {TokenBytes} bytes
   * @returns {string}
   */
  abstract generateCrypt(bytes: TokenBytes): string;

  /**
   * @description create hash token
   * @date 2026-02-08 14:43:48
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {string} password
   * @returns {string}
   */
  abstract hash(password: string): string;

  /**
   * @description validate if token hex is valid
   * @date 2026-02-08 16:18:42
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {string} hex
   * @param {TokenBytes} bytes
   * @returns {boolean}
   */
  abstract validateHex(hex: string, bytes: TokenBytes): boolean;
}
