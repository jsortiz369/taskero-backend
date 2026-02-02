import { UserToken } from '../user-token';

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
}
