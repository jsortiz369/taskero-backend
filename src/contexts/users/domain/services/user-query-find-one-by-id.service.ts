import { UserNotFoundException } from '../exceptions';
import { UserFindOneByIdProjection } from '../projections';
import { IUserQueryRepository } from '../repositories';

export class UserQueryFindOneByIdService {
  /**
   * Creates an instance of UserQueryFindOneByIdService.
   * @date 2025-12-26 10:36:29
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {IUserQueryRepository} _userQueryRepository
   */
  constructor(private readonly _userQueryRepository: IUserQueryRepository) {}

  /**
   * @description Get User
   * @date 2025-12-26 10:36:33
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {string} id
   * @returns {Promise<UserFindOneByIdProjection>}
   */
  async execute(id: string): Promise<UserFindOneByIdProjection> {
    const user = await this._userQueryRepository.findOneById(id);
    if (!user) throw new UserNotFoundException();
    return user;
  }
}
