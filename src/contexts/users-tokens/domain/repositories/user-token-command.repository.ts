import { UserToken } from '../user-token';
import { UserTokenId } from '../vo';

export abstract class IUserTokenCommandRepository {
  /**
   * @description Create new token y user
   * @date 2026-01-26 06:40:44
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {UserToken} data
   * @returns {Promise<UserToken>}
   */
  abstract create(data: UserToken): Promise<UserToken>;

  /**
   * @description Update token to used
   * @date 2026-02-08 20:36:50
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {string} userTokenId
   * @returns {Promise<void>}
   */
  abstract updateToUsed(userTokenId: UserTokenId): Promise<void>;
}
