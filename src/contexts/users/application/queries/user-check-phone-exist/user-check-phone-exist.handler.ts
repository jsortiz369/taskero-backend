import { IUserQueryRepository } from 'src/contexts/users/domain/repositories';
import { UserCheckPhoneExistQuery } from './user-check-phone-exist.query';

export class UserCheckPhoneExistHandler {
  /**
   * Creates an instance of UserCheckPhoneExistHandler.
   * @date 2025-12-26 21:21:34
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {IUserQueryRepository} _userQueryRepository
   */
  constructor(private readonly _userQueryRepository: IUserQueryRepository) {}

  async execute(queryPhone: UserCheckPhoneExistQuery): Promise<{ exist: boolean }> {
    // TODO: validate exist user by phone
    const exist = await this._userQueryRepository.checkPhoneExist(queryPhone.phone, queryPhone._id);
    return { exist };
  }
}
