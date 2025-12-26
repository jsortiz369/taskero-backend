import { IUuidRepository } from '../../domain/uuid.repository';
import { REGEX_UUID_V4 } from '../constants';

export class UuidRepositoryV4 implements IUuidRepository {
  /**
   * @description Generate uuid v4
   * @date 2025-12-26 06:48:06
   * @author Jogan Ortiz Muñoz
   *
   * @returns {string}
   */
  generateUuid(): string {
    return crypto.randomUUID();
  }

  /**
   * @description Validate uuid v4
   * @date 2025-12-26 06:48:18
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
