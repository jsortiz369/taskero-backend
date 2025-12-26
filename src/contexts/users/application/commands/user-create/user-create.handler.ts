import { IUuidRepository } from 'src/shared/uuid/domain/uuid.repository';
import { UserCreateCommand } from './user-create.command';
import { IBcryptRepository } from 'src/shared/bcrypt/domain/bcrypt.repository';
import { IUserRepository } from 'src/contexts/users/domain/repositories';
import { User } from 'src/contexts/users/domain/user';
import { UserConflictEmailException, UserConflictPhoneException } from 'src/contexts/users/domain/exceptions';
import { UserPrimitive } from 'src/contexts/users/domain/user.interface';

type UserCreateResponse = Pick<UserPrimitive, '_id' | 'names' | 'surnames' | 'birthday' | 'phone' | 'email' | 'createdAt' | 'updatedAt'>;
export class UserCreateHandler {
  /**
   * Creates an instance of UserCreateHandler.
   * @date 2025-12-26 07:18:46
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {IUuidRepository} _uuidRepository
   * @param {IBcryptRepository} _bcryptRepository
   * @param {IUserRepository} _userRepository
   */
  constructor(
    private readonly _uuidRepository: IUuidRepository,
    private readonly _bcryptRepository: IBcryptRepository,
    private readonly _userRepository: IUserRepository,
  ) {}

  async execute(command: UserCreateCommand): Promise<UserCreateResponse> {
    const userEntity = User.create({
      _id: this._uuidRepository.generateUuid(),
      names: command.names,
      surnames: command.surnames,
      birthday: command.birthday,
      phone: command.phone,
      email: command.email,
      confirmed: false,
      status: false,
    });

    // TODO: Validate existing user by email
    const existEmail = await this._userRepository.existByEmail(userEntity.email);
    if (existEmail) throw new UserConflictEmailException();

    // TODO Validate existing user by phone
    const existPhone = await this._userRepository.existByPhone(userEntity.phone);
    if (existPhone) throw new UserConflictPhoneException();

    // TODO: Create User
    const createUser = await this._userRepository.create(userEntity);
    const userPrimitive = createUser.toValuesPrimitives();

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
