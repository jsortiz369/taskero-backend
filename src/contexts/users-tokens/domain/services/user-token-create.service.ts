import { UserToken } from '../user-token';
import { UserId } from 'src/contexts/users/domain/vo';
import { UserTokenId } from '../vo';
import { IUserTokenCommandRepository } from '../repositories';
import { IBcryptRepository } from 'src/shared/bcrypt/domain/bcrypt.repository';
import { UserTokenTypes } from '../user-token.interface';
import { ICryptoRepository } from 'src/shared/crypto/domain/crypto.repository';

export class UserTokenCreateService {
  /**
   * Creates an instance of UserTokenCreateService.
   * @date 2026-01-28 20:39:32
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {ICryptoRepository} _cryptoRepository
   * @param {IBcryptRepository} _bcryptRepository
   * @param {IUserTokenCommandRepository} _userTokenCommandRepository
   */
  constructor(
    private readonly _cryptoRepository: ICryptoRepository,
    private readonly _bcryptRepository: IBcryptRepository,
    private readonly _userTokenCommandRepository: IUserTokenCommandRepository,
  ) {}

  async execute(idUser: string, type: UserTokenTypes): Promise<string> {
    const random = Math.floor(0 + Math.random() * 1_000_000);
    const token = random.toString().padStart(6, '0');
    const expireAt = new Date();
    expireAt.setMinutes(expireAt.getMinutes() + 15);

    const userToken = new UserToken(
      new UserTokenId(this._cryptoRepository.generateUuidV4()),
      new UserId(idUser),
      type,
      await this._bcryptRepository.hash(token),
      expireAt,
    );

    // TODO: Create user token
    await this._userTokenCommandRepository.create(userToken);

    return token;
  }
}
