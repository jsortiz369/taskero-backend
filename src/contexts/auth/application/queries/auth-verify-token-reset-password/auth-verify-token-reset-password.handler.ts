import { AuthVerifyTokenResetPasswordQuery } from './auth-verify-token-reset-password.query';
import { ICryptoRepository } from 'src/shared/crypto/domain/crypto.repository';
import { ICacheRepository } from 'src/shared/cache/domain/cache.repository';
import { NoTokenExistsException } from 'src/contexts/auth/domain/exceptions/no-token-exists.exception';

export class AuthVerifyTokenResetPasswordHandler {
  /**
   * Creates an instance of AuthVerifyTokenResetPasswordHandler.
   * @date 2026-04-12 17:11:01
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {ICryptoRepository} _cryptoRepository
   * @param {ICacheRepository} _cacheRepository
   */
  constructor(
    private readonly _cryptoRepository: ICryptoRepository,
    private readonly _cacheRepository: ICacheRepository,
  ) {}

  async execute(query: AuthVerifyTokenResetPasswordQuery): Promise<{ success: true }> {
    const tokenHash = this._cryptoRepository.hash(query.token);
    const idUser = await this._cacheRepository.get<string>(`reset-password:${tokenHash}`);

    if (!idUser) throw new NoTokenExistsException();

    return { success: true };
  }
}
