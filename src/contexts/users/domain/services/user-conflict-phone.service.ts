import { UserConflictPhoneException } from '../exceptions';
import { IUserQueryRepository } from '../repositories';

export class UserConflictPhoneService {
  /**
   * Creates an instance of UserConflictPhoneService.
   * @date 2026-01-05 07:01:02
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {IUserQueryRepository} _userQueryRepository
   */
  constructor(private readonly _userQueryRepository: IUserQueryRepository) {}

  async execute(phone: string, id?: string): Promise<boolean> {
    const existEmail = await this._userQueryRepository.conflictPhone(phone, id);
    if (existEmail) throw new UserConflictPhoneException();
    return false;
  }
}
