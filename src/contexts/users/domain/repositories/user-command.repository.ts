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
