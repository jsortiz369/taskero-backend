import { IUuidRepository } from 'src/shared/uuid/domain/uuid.repository';
import { UserCreateCommand } from './user-create.command';
import { IBcryptRepository } from 'src/shared/bcrypt/domain/bcrypt.repository';
import { IUserCommandRepository, IUserQueryRepository } from 'src/contexts/users/domain/repositories';
import { User } from 'src/contexts/users/domain/user';
import { UserConflictEmailException, UserConflictPhoneException } from 'src/contexts/users/domain/exceptions';
import { UserPrimitive } from 'src/contexts/users/domain/user.interface';
import { UserPasswordCreateService } from 'src/contexts/user-passwords/domain/services';
import { UserPassword } from 'src/contexts/user-passwords/domain/user-password';

type UserCreateResponse = Omit<UserPrimitive, 'deletedAt' | 'failedAttempts' | 'lockUntil'>;
export class UserCreateHandler {
  /**
   * Creates an instance of UserCreateHandler.
   * @date 2025-12-26 17:00:49
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {IUuidRepository} _uuidRepository
   * @param {IBcryptRepository} _bcryptRepository
   * @param {IUserQueryRepository} _userQueryRepository
   * @param {IUserCommandRepository} _userCommandRepository
   * @param {UserPasswordCreateService} _userPasswordCreateService
   */
  constructor(
    private readonly _uuidRepository: IUuidRepository,
    private readonly _bcryptRepository: IBcryptRepository,
    private readonly _userQueryRepository: IUserQueryRepository,
    private readonly _userCommandRepository: IUserCommandRepository,
    private readonly _userPasswordCreateService: UserPasswordCreateService,
  ) {}

  async execute(command: UserCreateCommand): Promise<UserCreateResponse> {
    // TODO: entity create user
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

    // TODO: Create User Password
    await this._userPasswordCreateService.execute(
      UserPassword.create({
        _id: this._uuidRepository.generateUuid(),
        userId: userPrimitive._id,
        password: await this._bcryptRepository.hash(command.password),
        isCurrent: true,
      }),
    );

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
