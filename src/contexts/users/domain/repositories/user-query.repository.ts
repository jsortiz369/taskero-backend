import { Nullable } from 'src/shared/system/domain/system.interface';
import { UserFindOneByIdProjection } from '../projections';

export abstract class IUserQueryRepository {
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
