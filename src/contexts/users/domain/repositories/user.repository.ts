import { User } from '../user';
import { UserEmail, UserId, UserPhone } from '../vo';

export abstract class IUserRepository {
  /**
   * @description Get One User By Id
   * @date 2025-12-25 20:58:58
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {UserId} id
   * @returns {Promise<User | null>}
   */
  abstract findOneById(id: UserId): Promise<User | null>;

  /**
   * @description validate exist email
   * @date 2025-12-25 20:59:07
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {UserEmail} email
   * @param {?UserId} [id]
   * @returns {Promise<boolean>}
   */
  abstract existByEmail(email: UserEmail, id?: UserId): Promise<boolean>;

  /**
   * @description validate exist phone
   * @date 2025-12-25 20:59:14
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {UserPhone} phone
   * @param {?UserId} [id]
   * @returns {Promise<boolean>}
   */
  abstract existByPhone(phone: UserPhone, id?: UserId): Promise<boolean>;

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
   * @param {UserId} id
   * @returns {Promise<User>}
   */
  abstract delete(id: UserId): Promise<User>;
}
