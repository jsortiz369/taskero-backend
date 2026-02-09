import { Nullable } from 'src/shared/system/domain/system.interface';
import { UserPasswordCurrentByIdUserProjection, UserPasswordFindAllByIdUserProjection } from '../projections';

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

  /**
   * @description Find all password by id user and limit
   * @date 2026-02-08 17:44:59
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {string} idUser
   * @returns {Promise<UserPasswordFindAllByIdUserProjection[]>}
   */
  abstract findAllByIdUser(idUser: string, limit: number): Promise<UserPasswordFindAllByIdUserProjection[]>;
}
