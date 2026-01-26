import { UserId } from 'src/contexts/users/domain/vo';
import { UserPassword } from '../user-password';

export abstract class IUserPasswordCommandRepository {
  /**
   * @description Create new password by user
   * @date 2026-01-26 06:40:17
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {UserPassword} data
   * @returns {Promise<UserPassword>}
   */
  abstract create(data: UserPassword): Promise<UserPassword>;

  /**
   * @description Disable created passwords by user ID
   * @date 2026-01-26 07:18:27
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {UserId} userId
   * @returns {Promise<void>}
   */
  abstract disableCreatedPasswordsByUserId(userId: UserId): Promise<void>;
}
