import { UserPasswordConflictCreatePasswordException } from '../exceptions';
import { IUserPasswordQueryRepository } from '../repositories';
import { IUserPasswordCommandRepository } from '../repositories/user-password-command.repository';
import { UserPassword } from '../user-password';
import { IBcryptRepository } from 'src/shared/bcrypt/domain/bcrypt.repository';
import { ICryptoRepository } from 'src/shared/crypto/domain/crypto.repository';

export class UserPasswordCreateService {
  /**
   * Creates an instance of UserPasswordCreateService.
   * @date 2026-01-26 07:12:17
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {ICryptoRepository} _uuidRepository
   * @param {IBcryptRepository} _bcryptRepository
   * @param {IUserPasswordQueryRepository} _userPasswordQueryRepository
   * @param {IUserPasswordCommandRepository} _userPasswordCommandRepository
   */
  constructor(
    private readonly _cryptoRepository: ICryptoRepository,
    private readonly _bcryptRepository: IBcryptRepository,
    private readonly _userPasswordQueryRepository: IUserPasswordQueryRepository,
    private readonly _userPasswordCommandRepository: IUserPasswordCommandRepository,
  ) {}

  async execute(userId: string, password: string): Promise<UserPassword> {
    // TODO: Get last 3 passwords
    const findAllPasswords = await this._userPasswordQueryRepository.findAllByIdUser(userId, 3);

    // TODO: Validate that no password exists
    for (let index = 0; index < findAllPasswords.length; index++) {
      const item = findAllPasswords[index];
      const existPassword = await this._bcryptRepository.compare(password, item.password);
      if (existPassword) throw new UserPasswordConflictCreatePasswordException();
    }

    const userPassword = UserPassword.create({
      _id: this._cryptoRepository.generateUuidV4(),
      userId,
      password: await this._bcryptRepository.hash(password),
      isCurrent: true,
    });

    // TODO: Disable previous passwords
    await this._userPasswordCommandRepository.disablePasswordsByUserId(userPassword._idUser);

    // Create new password
    return await this._userPasswordCommandRepository.create(userPassword);
  }
}
