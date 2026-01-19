import { IUserCommandRepository } from '../repositories';
import { UserId } from '../vo';

export class UserUpdateFailedAttemptsByIdService {
  /**
   * Creates an instance of UserUpdateFailedAttemptsByIdService.
   * @date 2026-01-17 17:26:03
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {IUserCommandRepository} _userCommandRepository
   */
  constructor(private readonly _userCommandRepository: IUserCommandRepository) {}

  async execute(id: string, failedAttempts: number) {
    const userId = new UserId(id);
    await this._userCommandRepository.updateLoginAttempts(userId, failedAttempts);
  }
}
