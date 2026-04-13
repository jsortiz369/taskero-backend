import { AuthResetPasswordCommand } from './auth-reset-password.command';
import { UserPasswordCreateService } from 'src/contexts/users-passwords/domain/services';
import { ICryptoRepository } from 'src/shared/crypto/domain/crypto.repository';
import { ICacheRepository } from 'src/shared/cache/domain/cache.repository';
import { NoTokenExistsException } from 'src/contexts/auth/domain/exceptions';

export class AuthResetPasswordHandler {
  /**
   * Creates an instance of AuthResetPasswordHandler.
   * @date 2026-02-08 17:32:39
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {ICryptoRepository} _cryptoRepository
   * @param {ICacheRepository} _cacheRepository
   * @param {UserPasswordCreateService} _passwordCreate
   */
  constructor(
    private readonly _cryptoRepository: ICryptoRepository,
    private readonly _cacheRepository: ICacheRepository,
    private readonly _passwordCreate: UserPasswordCreateService,
  ) {}

  async execute(command: AuthResetPasswordCommand): Promise<{ success: true }> {
    // TODO: validate token
    const tokenHash = this._cryptoRepository.hash(command.token);
    const idUser = await this._cacheRepository.get<string>(`reset-password:${tokenHash}`);

    // TODO: validate tokeen exists
    if (!idUser) throw new NoTokenExistsException();

    // TODO: delete token
    await this._cacheRepository.delete(`reset-password:${tokenHash}`);

    // TODO: create password
    await this._passwordCreate.execute(idUser, command.password);

    // TODO: if everything is ok
    return { success: true };
  }
}
