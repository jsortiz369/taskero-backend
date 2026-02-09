import { Nullable } from 'src/shared/system/domain/system.interface';
import { UserTokenCurrentProjection } from '../projections';
import { UserTokenTypes } from '../user-token.interface';

export abstract class IUserTokenQueryRepository {
  /**
   * @description get token by id user
   * @date 2026-01-31 07:39:27
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {string} idUser
   * @param {UserTokenTypes} typeToken
   * @returns {Promise<Nullable<UserTokenCurrentProjection>>}
   */
  abstract findCurrentByIdUser(idUser: string, typeToken: UserTokenTypes): Promise<Nullable<UserTokenCurrentProjection>>;

  /**
   * @description validate user by token
   * @date 2026-02-08 16:46:12
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {string} token
   * @param {UserTokenTypes} typeToken
   * @returns {Promise<Nullable<UserTokenCurrentProjection>>}
   */
  abstract findCurrentByToken(token: string, typeToken: UserTokenTypes): Promise<Nullable<UserTokenCurrentProjection>>;
}
