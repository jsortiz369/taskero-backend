import { User } from '../user';
import { UserId } from '../vo';
export abstract class IUserCommandRepository {
  /**
   * @description Create user
   * @date 2025-12-25 20:59:22
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {User} data
   * @returns {Promise<User>}
   */
  abstract create(data: User): Promise<User>;

  /**
   * @description Update user
   * @date 2025-12-25 20:59:43
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {User} data
   * @returns {Promise<User>}
   */
  abstract update(data: User): Promise<User>;

  /**
   * @description Update the number of failed login attempts
   * @date 2026-02-02 06:51:05
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {UserId} _id
   * @param {number} attempts
   * @returns {Promise<void>}
   */
  abstract updateLoginAttempts(_id: UserId, attempts: number): Promise<void>;

  /**
   * @description Update user confirmed status
   * @date 2026-02-02 06:52:03
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {UserId} _id
   * @returns {Promise<void>}
   */
  abstract updateConfirmed(_id: UserId): Promise<void>;

  /**
   * @description Delete user by Id
   * @date 2025-12-25 20:59:52
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {UserId} userId
   * @returns {Promise<User>}
   */
  abstract delete(userId: UserId): Promise<User>;
}
