import { Nullable } from 'src/shared/system/domain/system.interface';
import { IUserQueryRepository } from '../repositories';
import { UserLoginProjection } from '../projections/user-login.projection';

export class UserLoginService {
  /**
   * Creates an instance of UserLoginService.
   * @date 2026-01-17 17:18:08
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {IUserQueryRepository} _userQueryRepository
   */
  constructor(private readonly _userQueryRepository: IUserQueryRepository) {}

  async execute(username: string): Promise<Nullable<UserLoginProjection>> {
    // TODO: Check if user exist
    const user = await this._userQueryRepository.findOneByLogin(username);

    if (!user) return null;
    return user;
  }
}
