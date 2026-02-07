import { Nullable } from 'src/shared/system/domain/system.interface';
import { UserTokenCurrentByIdUserProjection } from '../projections';
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
   * @returns {Promise<Nullable<UserTokenCurrentByIdUserProjection>>}
   */
  abstract findCurrentByIdUser(idUser: string, typeToken: UserTokenTypes): Promise<Nullable<UserTokenCurrentByIdUserProjection>>;
}
