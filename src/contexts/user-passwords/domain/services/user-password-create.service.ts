import { IUserPasswordCommandRepository } from '../repositories/user-password-command.repository';
import { UserPassword } from '../user-password';

export class UserPasswordCreateService {
  /**
   * Creates an instance of UserPasswordCreateService.
   * @date 2025-12-27 17:32:18
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {IUserPasswordCommandRepository} _userPasswordCommandRepository
   */
  constructor(private readonly _userPasswordCommandRepository: IUserPasswordCommandRepository) {}

  async execute(data: UserPassword): Promise<UserPassword> {
    return await this._userPasswordCommandRepository.create(data);
  }
}
