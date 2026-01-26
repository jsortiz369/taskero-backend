import { Nullable } from 'src/shared/system/domain/system.interface';
import { UserPasswordCurrentByIdUserProjection } from '../projections/user-password-current-by-id-user.projection';

export abstract class IUserPasswordQueryRepository {
  /**
   * @description Get current user password
   * @date 2026-01-17 18:14:09
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {string} idUser
   * @returns {Promise<Nullable<UserPasswordCurrentByIdUserProjection>>}
   */
  abstract findCurrentByIdUser(idUser: string): Promise<Nullable<UserPasswordCurrentByIdUserProjection>>;
}
