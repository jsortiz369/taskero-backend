import { UserNotFoundException } from '../exceptions';
import { IUserRepository } from '../repositories';
import { User } from '../user';
import { UserId } from '../vo';

export class UserFindOneByIdService {
  constructor(private readonly userRepository: IUserRepository) {}

  /**
   * @description Validate exist user by ID
   * @date 2025-12-26 08:12:43
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {string} id
   * @returns {Promise<User>}
   */
  async execute(id: string): Promise<User> {
    // TODO: value object ID
    const _id = new UserId(id);
    const user = await this.userRepository.findOneById(_id);

    // TODO: throw exception if not found
    if (!user) throw new UserNotFoundException();
    return user;
  }
}
