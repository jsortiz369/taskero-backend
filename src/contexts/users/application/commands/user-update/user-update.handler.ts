import { IUserCommandRepository, IUserQueryRepository } from 'src/contexts/users/domain/repositories';
import { UserUpdateIdCommand } from './user-update-id.command';
import { UserUpdateCommand } from './user-update.command';
import { UserQueryFindOneByIdService } from 'src/contexts/users/domain/services';
import { User } from 'src/contexts/users/domain/user';
import { UserConflictEmailException, UserConflictPhoneException, UserNotChangesValueException } from 'src/contexts/users/domain/exceptions';
import { UserPrimitive } from 'src/contexts/users/domain/user.interface';

type UserUpdateResponse = Omit<UserPrimitive, 'deletedAt' | 'failedAttempts' | 'lockUntil'>;
export class UserUpdateHandler {
  /**
   * Creates an instance of UserUpdateHandler.
   * @date 2025-12-26 10:55:28
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserQueryFindOneByIdService} _userQueryFindOneByIdService
   * @param {IUserQueryRepository} _userQueryRepository
   * @param {IUserCommandRepository} _userCommandRepository
   */
  constructor(
    private readonly _userQueryFindOneByIdService: UserQueryFindOneByIdService,
    private readonly _userQueryRepository: IUserQueryRepository,
    private readonly _userCommandRepository: IUserCommandRepository,
  ) {}

  async execute(idCommand: UserUpdateIdCommand, command: UserUpdateCommand): Promise<UserUpdateResponse> {
    // TODO: validate exist user by ID
    const user = await this._userQueryFindOneByIdService.execute(idCommand._id);

    // TODO: update user
    const userEntity = this.validateChangesValues(
      command,
      User.fromPrimitives({
        _id: user._id,
        names: user.names,
        surnames: user.surnames,
        birthday: user.birthday,
        phone: user.phone,
        email: user.email,
        status: user.status,
        confirmed: user.confirmed,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }),
    );

    // TODO: Validate existing user by email
    if (command.email) {
      const existEmail = await this._userQueryRepository.checkEmailExist(command.email, idCommand._id);
      if (existEmail) throw new UserConflictEmailException();
    }

    // TODO Validate existing user by phone
    if (command.phone) {
      const existPhone = await this._userQueryRepository.checkPhoneExist(command.phone, idCommand._id);
      if (existPhone) throw new UserConflictPhoneException();
    }

    // TODO: update user
    const updatedUser = await this._userCommandRepository.update(userEntity);
    const userPrimitive = updatedUser.toValuesPrimitives();

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

  private validateChangesValues(command: UserUpdateCommand, user: User): User {
    let checkChanges = false;

    // validate users names
    if (command.names && command.names !== user.names._value) {
      user.names = command.names;
      checkChanges = true;
    }

    // validate users surnames
    if (command.surnames && command.surnames !== user.surnames._value) {
      user.surnames = command.surnames;
      checkChanges = true;
    }

    // validate users birthday
    if (command.birthday && command.birthday !== user.birthday._value) {
      user.birthday = command.birthday;
      checkChanges = true;
    }

    // validate users phone
    if (command.phone && command.phone !== user.phone._value) {
      user.phone = command.phone;
      checkChanges = true;
    }

    // validate users email
    if (command.email && command.email !== user.email._value) {
      user.email = command.email;
      checkChanges = true;
    }

    // validate users status
    if (command.status !== undefined && command.status !== user.status._value) {
      user.status = command.status;
      checkChanges = true;
    }

    // validate users confirmed
    if (command.confirmed !== undefined && command.confirmed !== user.confirmed._value) {
      user.confirmed = command.confirmed;
      checkChanges = true;
    }

    if (!checkChanges) throw new UserNotChangesValueException();
    return user;
  }
}
