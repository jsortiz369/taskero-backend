import { UuidRepository } from '../../domain/uuid.repository';
import { REGEX_UUID_V4 } from '../constants';

export class UuidV4Persistence implements UuidRepository {
  /**
   * @description Generate uuid
   * @date 2025-12-21 20:38:15
   * @author Jogan Ortiz Muñoz
   *
   * @returns {string}
   */
  generateUuid(): string {
    return crypto.randomUUID();
  }

  /**
   * @description Validate uuid
   * @date 2025-12-21 20:38:23
   * @author Jogan Ortiz Muñoz
   *
   * @param {string} uuid
   * @returns {boolean}
   */
  validateUuid(uuid: string): boolean {
    if (!REGEX_UUID_V4.test(uuid)) return false;
    return true;
  }
}
