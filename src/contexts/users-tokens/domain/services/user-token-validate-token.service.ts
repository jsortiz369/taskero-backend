import { ICryptoRepository } from 'src/shared/crypto/domain/crypto.repository';
import { IUserTokenQueryRepository } from '../repositories';
import { UserTokenTypes } from '../user-token.interface';
import { NoTokenExistsException, TokenExpiredException, TokenUsedException } from '../exceptions';

export class UserTokenValidateTokenService {
  /**
   * Creates an instance of UserTokenValidateTokenService.
   * @date 2026-02-08 16:49:58
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

  async execute(token: string, type: UserTokenTypes) {
    // TODO: token hash
    const tokenHash = this._cryptoRepository.hash(token);

    // TODO: validate token
    const userToken = await this._userTokenRepository.findCurrentByToken(tokenHash, type);
    if (!userToken) throw new NoTokenExistsException();

    // TODO: validate token not expired
    const now = new Date();
    if (userToken.expiresAt < now) throw new TokenExpiredException();

    // TODO: validate token not used
    if (userToken.used) throw new TokenUsedException();

    return userToken;
  }
}
