import { UserConflictUsernameException } from '../exceptions';
import { IUserQueryRepository } from '../repositories';

export class UserConflictUsernameService {
  /**
   * Creates an instance of UserConflictUsernameService.
   * @date 2026-01-12 20:40:43
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {IUserQueryRepository} _userQueryRepository
   */
  constructor(private readonly _userQueryRepository: IUserQueryRepository) {}

  async execute(username: string, id?: string): Promise<boolean> {
    const existEmail = await this._userQueryRepository.conflictUsername(username, id);
    if (existEmail) throw new UserConflictUsernameException();
    return false;
  }
}
