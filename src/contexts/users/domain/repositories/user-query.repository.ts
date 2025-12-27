import { DataFindAll, Nullable } from 'src/shared/system/domain/system.interface';
import { UserFindAllProjection, UserFindOneByIdProjection } from '../projections';
import { UserFindAll } from '../user.interface';

export abstract class IUserQueryRepository {
  /**
   * @description Get all user by filters
   * @date 2025-12-26 19:40:17
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {UserFindAll} query
   * @returns {Promise<DataFindAll<UserFindAllProjection>>}
   */
  abstract findAll(query: UserFindAll): Promise<DataFindAll<UserFindAllProjection>>;

  /**
   * @description Get User By Id
   * @date 2025-12-26 10:04:10
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {string} id
   * @returns {Promise<Nullable<UserFindOneByIdProjection>>}
   */
  abstract findOneById(id: string): Promise<Nullable<UserFindOneByIdProjection>>;

  /**
   * @description Check if email exist
   * @date 2025-12-26 10:04:21
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {string} email
   * @param {?string} [id]
   * @returns {Promise<boolean>}
   */
  abstract checkEmailExist(email: string, id?: string): Promise<boolean>;

  /**
   * @description Check if phone exist
   * @date 2025-12-26 10:05:32
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {string} phone
   * @param {?string} [id]
   * @returns {Promise<boolean>}
   */
  abstract checkPhoneExist(phone: string, id?: string): Promise<boolean>;
}
