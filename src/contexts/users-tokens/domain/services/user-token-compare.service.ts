import { IBcryptRepository } from 'src/shared/bcrypt/domain/bcrypt.repository';
import { NoTokenExistsException, TokenExpiredException, TokenNotEqualException } from '../exceptions';
import { UserTokenCurrentByIdUserProjection } from '../projections';
import { UserTokenQueryRepository } from '../repositories/user-token-query.repository';

export class UserTokenCompareService {
  /**
   * Creates an instance of UserTokenCompareService.
   * @date 2026-01-31 07:40:55
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserTokenQueryRepository} _userTokenRepository
   * @param {IBcryptRepository} _bcryptRepository
   */
  constructor(
    private readonly _userTokenRepository: UserTokenQueryRepository,
    private readonly _bcryptRepository: IBcryptRepository,
  ) {}

  async execute(idUser: string, token: string): Promise<UserTokenCurrentByIdUserProjection> {
    const result = await this._userTokenRepository.findCurrentByIdUser(idUser);
    if (!result) throw new NoTokenExistsException();

    // TODO: validate token not expired
    const now = new Date();
    if (result.expiresAt < now) throw new TokenExpiredException();

    // TODO: validate token
    const isTokenValid = await this._bcryptRepository.compare(token, result.token);
    if (!isTokenValid) throw new TokenNotEqualException();

    return result;
  }
}
