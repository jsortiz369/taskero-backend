import crypto from 'node:crypto';

import { ICryptoRepository } from '../../domain/crypto.repository';
import { REGEX_UUID_V4 } from '../constants';
import { TokenBytes, TokenOptions } from '../../domain/crypto.interface';

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
   * @description Generate token for number or alfanumeric length default for number 6 and alfanumeric 32 bytes
   * @date 2026-02-08 15:21:46
   * @author Jogan Ortiz Muñoz
   *
   * @param {TokenOptions} options
   * @returns {string}
   */
  token(options: TokenOptions): string {
    // TODO: if option is number
    if (options.kind === 'NUMBER') {
      const length = options?.length || 6;
      if (!Number.isInteger(length) || length < 1 || length > 16) throw new Error('Invalid TokenLength');
      return Array.from({ length }, () => crypto.randomInt(0, 10)).join('');
    }

    // TODO: if option is alphanumeric
    const bytes = options?.bytes || 32;
    if (!Number.isInteger(bytes) || (bytes != 16 && bytes != 32 && bytes != 64)) throw new Error('Invalid TokenBytes');
    return crypto.randomBytes(bytes).toString('hex');
  }

  /**
   * @description generate crypt
   * @date 2026-02-07 07:18:46
   * @author Jogan Ortiz Muñoz
   *
   * @param {number} bytes
   * @returns {string}
   */
  generateCrypt(bytes: TokenBytes): string {
    // TODO: validate bytes
    if (!Number.isInteger(length) || (bytes != 16 && bytes != 32 && bytes != 64)) throw new Error('Invalid TokenBytes');
    return crypto.randomBytes(bytes).toString('hex');
  }

  /**
   * @description create hash token
   * @date 2026-02-08 15:27:20
   * @author Jogan Ortiz Muñoz
   *
   * @param {string} token
   * @returns {string}
   */
  hash(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  /**
   * @description validate if token hex is valid
   * @date 2026-02-08 16:19:24
   * @author Jogan Ortiz Muñoz
   *
   * @param {string} hex
   * @param {TokenBytes} bytes
   * @returns {boolean}
   */
  validateHex(hex: string, bytes: TokenBytes): boolean {
    if (!Number.isInteger(length) || (bytes != 16 && bytes != 32 && bytes != 64)) throw new Error('Invalid TokenBytes');
    const expectedLength = bytes * 2;
    return typeof hex === 'string' && hex.length === expectedLength && /^[0-9a-f]+$/i.test(hex);
  }
}
