import { Nullable } from 'src/shared/system/domain/system.interface';
import { IUserPasswordQueryRepository } from '../repositories';
import { UserPasswordCurrentByIdUserProjection } from '../projections/user-password-current-by-id-user.projection';

export class UserPasswordByIdUserService {
  /**
   * Creates an instance of UserPasswordByIdUserService.
   * @date 2026-01-17 17:59:39
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {IUserPasswordQueryRepository} _userPasswordQueryRepository
   */
  constructor(private readonly _userPasswordQueryRepository: IUserPasswordQueryRepository) {}

  async execute(idUser: string): Promise<Nullable<UserPasswordCurrentByIdUserProjection>> {
    return await this._userPasswordQueryRepository.findCurrentByIdUser(idUser);
  }
}
