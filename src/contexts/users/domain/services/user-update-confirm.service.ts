import { IUserCommandRepository } from '../repositories';
import { UserId } from '../vo';

export class UserUpdateConfirmService {
  /**
   * Creates an instance of UserUpdateConfirmService.
   * @date 2026-02-02 06:54:22
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {IUserCommandRepository} _userCommandRepository
   */
  constructor(private readonly _userCommandRepository: IUserCommandRepository) {}

  async execute(idUser: string): Promise<void> {
    const userId = new UserId(idUser);
    await this._userCommandRepository.updateConfirmed(userId);
    return;
  }
}
