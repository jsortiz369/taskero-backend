import { UserPrimitive } from 'src/contexts/users/domain/user.interface';
import { UserDeleteIdCommand } from './user-delete-id.command';
import { UserQueryFindOneByIdService } from 'src/contexts/users/domain/services';
import { IUserCommandRepository } from 'src/contexts/users/domain/repositories';
import { UserId } from 'src/contexts/users/domain/vo';

type UserCreateResponse = Pick<UserPrimitive, '_id' | 'names' | 'surnames' | 'birthday' | 'phone' | 'email' | 'createdAt' | 'updatedAt'>;
export class UserDeleteHandler {
  /**
   * Creates an instance of UserDeleteHandler.
   * @date 2025-12-26 08:15:53
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserQueryFindOneByIdService} _userQueryFindOneByIdService
   * @param {IUserCommandRepository} _userRepository
   */
  constructor(
    private readonly _userQueryFindOneByIdService: UserQueryFindOneByIdService,
    private readonly _userRepository: IUserCommandRepository,
  ) {}

  async execute(idCommand: UserDeleteIdCommand): Promise<UserCreateResponse> {
    // TODO: validate exist user by ID
    const user = await this._userQueryFindOneByIdService.execute(idCommand._id);

    // TODO: delete user
    const userDelete = await this._userRepository.delete(new UserId(user._id));
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
