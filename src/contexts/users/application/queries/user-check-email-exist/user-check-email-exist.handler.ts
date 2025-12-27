import { IUserQueryRepository } from 'src/contexts/users/domain/repositories';
import { UserCheckEmailExistQuery } from './user-check-email-exist.query';

export class UserCheckEmailExistHandler {
  /**
   * Creates an instance of UserCheckEmailExistHandler.
   * @date 2025-12-26 21:15:15
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {IUserQueryRepository} _userQueryRepository
   */
  constructor(private readonly _userQueryRepository: IUserQueryRepository) {}

  async execute(queryEmail: UserCheckEmailExistQuery): Promise<{ exist: boolean }> {
    // TODO: validate exist user by email
    const exist = await this._userQueryRepository.checkEmailExist(queryEmail.email, queryEmail._id);
    return { exist };
  }
}
