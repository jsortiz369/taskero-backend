import { IUserRepository } from 'src/contexts/users/domain/repositories';
import { UserFindOneByIdService } from 'src/contexts/users/domain/services';
import { UserPrimitive } from 'src/contexts/users/domain/user.interface';
import { UserDeleteIdCommand } from './user-delete-id.command';

type UserCreateResponse = Pick<UserPrimitive, '_id' | 'names' | 'surnames' | 'birthday' | 'phone' | 'email' | 'createdAt' | 'updatedAt'>;
export class UserDeleteHandler {
  /**
   * Creates an instance of UserDeleteHandler.
   * @date 2025-12-26 08:15:53
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserFindOneByIdService} _userFindOneByIdService
   * @param {IUserRepository} _userRepository
   */
  constructor(
    private readonly _userFindOneByIdService: UserFindOneByIdService,
    private readonly _userRepository: IUserRepository,
  ) {}

  async execute(idCommand: UserDeleteIdCommand): Promise<UserCreateResponse> {
    // TODO: validate exist user by ID
    const user = await this._userFindOneByIdService.execute(idCommand._id);

    // TODO: delete user
    const userDelete = await this._userRepository.delete(user);
    const userPrimitive = userDelete.toValuesPrimitives();

    return {
      _id: userPrimitive._id,
      names: userPrimitive.names,
      surnames: userPrimitive.surnames,
      birthday: userPrimitive.birthday,
      phone: userPrimitive.phone,
      email: userPrimitive.email,
      createdAt: userPrimitive.createdAt,
      updatedAt: userPrimitive.updatedAt,
    };
  }
}
