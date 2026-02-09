import bcrypt from 'bcrypt';

import { IBcryptRepository } from '../../domain/bcrypt.repository';

export class BcryptRepository implements IBcryptRepository {
  /**
   * @description Encrypt password
   * @date 2025-12-22 07:49:51
   * @author Jogan Ortiz Muñoz
   *
   * @param {string} password
   * @returns {Promise<string>}
   */
  hash(password: string): Promise<string> {
    const saltOrRounds = bcrypt.genSaltSync(12);
    return bcrypt.hash(password, saltOrRounds);
  }

  /**
   * @description Compare if equal password
   * @date 2025-12-22 07:49:58
   * @author Jogan Ortiz Muñoz
   *
   * @param {string} password
   * @param {string} hash
   * @returns {Promise<boolean>}
   */
  compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
