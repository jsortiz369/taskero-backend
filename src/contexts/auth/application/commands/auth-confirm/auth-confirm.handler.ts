import { UserQueryFindOneByIdService, UserUpdateConfirmService } from 'src/contexts/users/domain/services';
import { AuthConfirmCommand } from './auth-confirm.command';
import { AccountAlreadyConfirmedException, NoTokenExistsException, TokenNotEqualException } from 'src/contexts/auth/domain/exceptions';
import { IJwtRepository } from 'src/shared/jwt/domain/jwt.repository';
import { ICryptoRepository } from 'src/shared/crypto/domain/crypto.repository';
import { ICacheRepository } from 'src/shared/cache/domain/cache.repository';

export class AuthConfirmHandler {
  /**
   * Creates an instance of AuthConfirmHandler.
   * @date 2026-02-02 07:01:33
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserQueryFindOneByIdService} _userQueryFindOneByIdService
   * @param {ICryptoRepository} _cryptoRepository
   * @param {ICacheRepository} _cacheRepository
   * @param {UserUpdateConfirmService} _userUpdateConfirmService
   * @param {IJwtRepository} _jwtRepository
   */
  constructor(
    private readonly _userQueryFindOneByIdService: UserQueryFindOneByIdService,
    private readonly _cryptoRepository: ICryptoRepository,
    private readonly _cacheRepository: ICacheRepository,
    private readonly _userUpdateConfirmService: UserUpdateConfirmService,
    private readonly _jwtRepository: IJwtRepository,
  ) {}

  async execute(command: AuthConfirmCommand) {
    // TODO: valdate exists user by id
    const user = await this._userQueryFindOneByIdService.execute(command.idUser);

    // TODO: validate user hasn't confirmed account
    if (user.confirmed) throw new AccountAlreadyConfirmedException();

    // TODO: validate token exists by user id and compare token
    const tokenHash = this._cryptoRepository.hash(command.otp);
    const tokenComparison = await this._cacheRepository.get<string>(`confirm-account:${command.idUser}`);

    // TODO: validate tokeen exists
    if (!tokenComparison) throw new NoTokenExistsException();

    // TODO: validate token equals
    if (tokenHash !== tokenComparison) throw new TokenNotEqualException();

    // TODO: confirm account
    await this._userUpdateConfirmService.execute(command.idUser);

    // TODO: delete token
    await this._cacheRepository.delete(`confirm-account:${command.idUser}`);

    // TODO: generate tokens
    const payload = { username: user.username, sub: user._id };
    const token = this._jwtRepository.generate(payload);
    const tokenRefresh = this._jwtRepository.generateRefresh(payload);

    return {
      token: token,
      tokenRefresh: tokenRefresh,
      data: {
        names: user.names,
        surnames: user.surnames,
        username: user.username,
        email: user.email,
      },
    };
  }
}
