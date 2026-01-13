import { IUuidRepository } from 'src/shared/uuid/domain/uuid.repository';
import { UserCreateCommand } from '../../application/commands/user-create';
import { IBcryptRepository } from 'src/shared/bcrypt/domain/bcrypt.repository';
import { IUserCommandRepository } from '../repositories';
import { UserPasswordCreateService } from 'src/contexts/user-passwords/domain/services';
import { User } from '../user';
import { UserConflictEmailService } from './user-conflict-email.service';
import { UserConflictPhoneService } from './user-conflict-phone.service';
import { UserPassword } from 'src/contexts/user-passwords/domain/user-password';
import { UserConflictUsernameService } from './user-conflict-username.service';

export class UserCreateService {
  /**
   * Creates an instance of UserCreateService.
   * @date 2026-01-08 19:52:39
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {IUuidRepository} _uuidRepository
   * @param {UserConflictUsernameService} _conflictUsername
   * @param {UserConflictEmailService} _conflictEmail
   * @param {UserConflictPhoneService} _conflictPhone
   * @param {IBcryptRepository} _bcryptRepository
   * @param {IUserCommandRepository} _commandRepository
   * @param {UserPasswordCreateService} _userPasswordCreateService
   */
  constructor(
    private readonly _uuidRepository: IUuidRepository,
    private readonly _conflictUsername: UserConflictUsernameService,
    private readonly _conflictEmail: UserConflictEmailService,
    private readonly _conflictPhone: UserConflictPhoneService,
    private readonly _bcryptRepository: IBcryptRepository,
    private readonly _commandRepository: IUserCommandRepository,
    private readonly _passwordCreate: UserPasswordCreateService,
  ) {}

  async execute(command: UserCreateCommand): Promise<User> {
    // TODO: entity create user
    const userEntity = User.create({
      _id: this._uuidRepository.generateUuid(),
      names: command.names,
      surnames: command.surnames,
      username: command.username,
      phone: command.phone,
      email: command.email,
      confirmed: false,
      status: true,
    });

    // TODO: Validate existing user by username
    await this._conflictUsername.execute(command.username);

    // TODO: Validate existing user by email
    await this._conflictEmail.execute(command.email);

    // TODO Validate existing user by phone
    await this._conflictPhone.execute(command.phone);

    // TODO: Create User
    const createUser = await this._commandRepository.create(userEntity);

    // TODO: Create User Password
    await this._passwordCreate.execute(
      UserPassword.create({
        _id: this._uuidRepository.generateUuid(),
        userId: createUser._id._value,
        password: await this._bcryptRepository.hash(command.password),
        isCurrent: true,
      }),
    );

    return createUser;
  }
}
