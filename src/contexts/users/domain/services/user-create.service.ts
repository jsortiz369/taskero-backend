import { ICryptoRepository } from 'src/shared/crypto/domain/crypto.repository';
import { UserPasswordCreateService } from 'src/contexts/users-passwords/domain/services';
import { UserCreateCommand } from '../../application/commands/user-create';
import { IUserCommandRepository } from '../repositories';
import { UserConflictEmailService } from './user-conflict-email.service';
import { UserConflictPhoneService } from './user-conflict-phone.service';
import { UserConflictUsernameService } from './user-conflict-username.service';
import { User } from '../user';

export class UserCreateService {
  /**
   * Creates an instance of UserCreateService.
   * @date 2026-01-08 19:52:39
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {ICryptoRepository} _cryptoRepository
   * @param {UserConflictUsernameService} _conflictUsername
   * @param {UserConflictEmailService} _conflictEmail
   * @param {UserConflictPhoneService} _conflictPhone
   * @param {IUserCommandRepository} _commandRepository
   * @param {UserPasswordCreateService} _userPasswordCreateService
   */
  constructor(
    private readonly _cryptoRepository: ICryptoRepository,
    private readonly _conflictUsername: UserConflictUsernameService,
    private readonly _conflictEmail: UserConflictEmailService,
    private readonly _conflictPhone: UserConflictPhoneService,
    private readonly _commandRepository: IUserCommandRepository,
    private readonly _passwordCreate: UserPasswordCreateService,
  ) {}

  async execute(command: UserCreateCommand): Promise<User> {
    // TODO: entity create user
    const userEntity = User.create({
      _id: this._cryptoRepository.generateUuidV4(),
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
    await this._passwordCreate.execute(createUser._id._value, command.password);

    return createUser;
  }
}
