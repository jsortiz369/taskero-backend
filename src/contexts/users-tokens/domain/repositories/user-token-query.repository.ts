import { Nullable } from 'src/shared/system/domain/system.interface';
import { UserTokenCurrentByIdUserProjection } from '../projections';

export abstract class UserTokenQueryRepository {
  /**
   * @description get token by id user
   * @date 2026-01-31 07:39:27
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {string} idUser
   * @returns {Promise<Nullable<UserTokenCurrentByIdUserProjection>>}
   */
  abstract findCurrentByIdUser(idUser: string): Promise<Nullable<UserTokenCurrentByIdUserProjection>>;
}
