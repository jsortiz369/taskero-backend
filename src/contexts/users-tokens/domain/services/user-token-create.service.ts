import { UserToken } from '../user-token';
import { UserId } from 'src/contexts/users/domain/vo';
import { UserTokenId } from '../vo';
import { IUserTokenCommandRepository } from '../repositories';
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
   * @param {IUserTokenCommandRepository} _userTokenCommandRepository
   */
  constructor(
    private readonly _cryptoRepository: ICryptoRepository,
    private readonly _userTokenCommandRepository: IUserTokenCommandRepository,
  ) {}

  async execute(idUser: string, type: UserTokenTypes): Promise<string> {
    let token: string | null = null;
    if (['CONFIRM_ACCOUNT', 'LOGIN_EXTRA'].includes(type)) token = this._cryptoRepository.token({ kind: 'NUMBER' });
    if (type === 'RESET_PASSWORD') token = this._cryptoRepository.token({ kind: 'ALPHANUMERIC' });
    if (!token) throw new Error('Token not generated');

    // TODO: calculate expireAt in 15 minutes
    const expireAt = new Date();
    expireAt.setMinutes(expireAt.getMinutes() + 15);

    // TODO: prepare user token
    const userToken = new UserToken(
      new UserTokenId(this._cryptoRepository.generateUuidV4()),
      new UserId(idUser),
      type,
      this._cryptoRepository.hash(token),
      expireAt,
    );

    // TODO: Create user token
    await this._userTokenCommandRepository.create(userToken);

    return token;
  }
}
