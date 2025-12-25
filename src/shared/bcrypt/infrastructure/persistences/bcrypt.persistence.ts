import bcrypt from 'bcrypt';

import { BcryptRepository } from '../../domain/bcrypt.repository';

export class BcryptPersistence implements BcryptRepository {
  
  /**
   * @description Encrypt password
   * @date 2025-12-22 07:49:51
   * @author Jogan Ortiz Muñoz
   *
   * @param {string} password 
   * @param {?(string | number)} [saltOrRounds] 
   * @returns {Promise<string>} 
   */
  hash(password: string, saltOrRounds?: string | number): Promise<string> {
    saltOrRounds = !saltOrRounds ? bcrypt.genSaltSync(10) : saltOrRounds;
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

  
  /**
   * @description Generate salt by encrypt password
   * @date 2025-12-22 07:50:05
   * @author Jogan Ortiz Muñoz
   *
   * @returns {string} 
   */
  generateSalt(): string {
    return bcrypt.genSaltSync(10);
  }
}
