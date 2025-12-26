import { IUuidRepository } from 'src/shared/uuid/domain/uuid.repository';
import { UserCreateCommand } from './user-create.command';
import { IBcryptRepository } from 'src/shared/bcrypt/domain/bcrypt.repository';
import { IUserCommandRepository, IUserQueryRepository } from 'src/contexts/users/domain/repositories';
import { User } from 'src/contexts/users/domain/user';
import { UserConflictEmailException, UserConflictPhoneException } from 'src/contexts/users/domain/exceptions';
import { UserPrimitive } from 'src/contexts/users/domain/user.interface';

type UserCreateResponse = Omit<UserPrimitive, 'deletedAt' | 'failedAttempts' | 'lockUntil'>;
export class UserCreateHandler {
  constructor(
    private readonly _uuidRepository: IUuidRepository,
    private readonly _bcryptRepository: IBcryptRepository,
    private readonly _userQueryRepository: IUserQueryRepository,
    private readonly _userCommandRepository: IUserCommandRepository,
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
    const existEmail = await this._userQueryRepository.checkEmailExist(command.email);
    if (existEmail) throw new UserConflictEmailException();

    // TODO Validate existing user by phone
    const existPhone = await this._userQueryRepository.checkPhoneExist(command.phone);
    if (existPhone) throw new UserConflictPhoneException();

    // TODO: Create User
    const createUser = await this._userCommandRepository.create(userEntity);
    const userPrimitive = createUser.toValuesPrimitives();

    return {
      _id: userPrimitive._id,
      names: userPrimitive.names,
      surnames: userPrimitive.surnames,
      birthday: userPrimitive.birthday,
      phone: userPrimitive.phone,
      email: userPrimitive.email,
      avatar: userPrimitive.avatar,
      confirmed: userPrimitive.confirmed,
      status: userPrimitive.status,
      createdAt: userPrimitive.createdAt,
      updatedAt: userPrimitive.updatedAt,
    };
  }
}
