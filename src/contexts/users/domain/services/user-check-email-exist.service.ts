import { UserConflictEmailException } from '../exceptions';
import { IUserQueryRepository } from '../repositories';

export class UserCheckEmailExistService {
  /**
   * Creates an instance of UserCheckEmailExistService.
   * @date 2026-01-05 06:41:54
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {IUserQueryRepository} _userQueryRepository
   */
  constructor(private readonly _userQueryRepository: IUserQueryRepository) {}

  async execute(email: string, id?: string): Promise<boolean> {
    const existEmail = await this._userQueryRepository.checkEmailExist(email, id);
    if (existEmail) throw new UserConflictEmailException();
    return false;
  }
}
