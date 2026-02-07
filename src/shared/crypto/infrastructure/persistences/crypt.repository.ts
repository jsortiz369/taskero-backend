import { ICryptoRepository } from '../../domain/crypto.repository';
import { REGEX_UUID_V4 } from '../constants';

export class CryptoRepository implements ICryptoRepository {
  /**
   * @description  Generate uuid v4
   * @date 2026-02-07 07:17:51
   * @author Jogan Ortiz Muñoz
   *
   * @returns {string}
   */
  generateUuidV4(): string {
    return crypto.randomUUID();
  }

  /**
   * @description Validate uuid v4
   * @date 2026-02-07 07:18:29
   * @author Jogan Ortiz Muñoz
   *
   * @param {string} uuid
   * @returns {boolean}
   */
  validateIsUuidV4(uuid: string): boolean {
    if (!REGEX_UUID_V4.test(uuid)) return false;
    return true;
  }

  /**
   * @description generate crypt
   * @date 2026-02-07 07:18:46
   * @author Jogan Ortiz Muñoz
   *
   * @param {number} bytes
   * @returns {string}
   */
  generateCrypt(bytes: number): string {
    return crypto.getRandomValues(new Uint8Array(bytes)).toString();
  }
}
