import { IUserTokenCommandRepository } from '../repositories';
import { UserTokenId } from '../vo';

export class UserTokenUpdateUsedService {
  /**
   * Creates an instance of UserTokenUpdateUsedService.
   * @date 2026-02-08 20:58:49
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {IUserTokenCommandRepository} _userTokenCommandRepository
   */
  constructor(private readonly _userTokenCommandRepository: IUserTokenCommandRepository) {}

  async execute(userTokenId: string): Promise<void> {
    const _id = new UserTokenId(userTokenId);
    await this._userTokenCommandRepository.updateToUsed(_id);
  }
}
