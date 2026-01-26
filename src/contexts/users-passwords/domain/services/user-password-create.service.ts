import { IUuidRepository } from 'src/shared/uuid/domain/uuid.repository';
import { IUserPasswordCommandRepository } from '../repositories/user-password-command.repository';
import { UserPassword } from '../user-password';
import { IBcryptRepository } from 'src/shared/bcrypt/domain/bcrypt.repository';

export class UserPasswordCreateService {
  /**
   * Creates an instance of UserPasswordCreateService.
   * @date 2026-01-26 07:12:17
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {IUuidRepository} _uuidRepository
   * @param {IBcryptRepository} _bcryptRepository
   * @param {IUserPasswordCommandRepository} _userPasswordCommandRepository
   */
  constructor(
    private readonly _uuidRepository: IUuidRepository,
    private readonly _bcryptRepository: IBcryptRepository,
    private readonly _userPasswordCommandRepository: IUserPasswordCommandRepository,
  ) {}

  async execute(userId: string, password: string): Promise<UserPassword> {
    const userPassword = UserPassword.create({
      _id: this._uuidRepository.generateUuid(),
      userId,
      password: await this._bcryptRepository.hash(password),
      isCurrent: true,
    });

    // TODO: Disable previous passwords
    await this._userPasswordCommandRepository.disableCreatedPasswordsByUserId(userPassword._idUser);

    // Create new password
    return await this._userPasswordCommandRepository.create(userPassword);
  }
}
