import { NoTokenExistsException, TokenExpiredException, TokenNotEqualException } from '../exceptions';
import { IUserTokenQueryRepository } from '../repositories';
import { UserTokenTypes } from '../user-token.interface';
import { ICryptoRepository } from 'src/shared/crypto/domain/crypto.repository';

export class UserTokenCompareService {
  /**
   * Creates an instance of UserTokenCompareService.
   * @date 2026-01-31 07:40:55
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {ICryptoRepository} _cryptoRepository
   * @param {IUserTokenQueryRepository} _userTokenRepository
   */
  constructor(
    private readonly _cryptoRepository: ICryptoRepository,
    private readonly _userTokenRepository: IUserTokenQueryRepository,
  ) {}

  async execute(idUser: string, token: string, type: UserTokenTypes) {
    const result = await this._userTokenRepository.findCurrentByIdUser(idUser, type);
    if (!result) throw new NoTokenExistsException();

    // TODO: validate token equals
    const tokenHash = this._cryptoRepository.hash(token);
    if (result.token !== tokenHash) throw new TokenNotEqualException();

    // TODO: validate token not expired
    const now = new Date();
    if (result.expiresAt < now) throw new TokenExpiredException();

    return result;
  }
}
