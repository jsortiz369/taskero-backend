import { UserAuthService } from 'src/contexts/users/domain/services';
import { AuthRecoverPasswordCommand } from './auth-recover-password.command';
import { ISendEmailBullmqRepository } from 'src/shared/bullmq/domain/repositories/send-email.repository';
import { ICacheRepository } from 'src/shared/cache/domain/cache.repository';
import { ICryptoRepository } from 'src/shared/crypto/domain/crypto.repository';

export class AuthRecoverPasswordHandler {
  /**
   * Creates an instance of AuthRecoverPasswordHandler.
   * @date 2026-02-08 14:19:03
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserAuthService} _userAuthService
   * @param {ICryptoRepository} _cryptoRepository
   * @param {ICacheRepository} _cacheRepository
   * @param {ISendEmailBullmqRepository} _sendEmailQueue
   */
  constructor(
    private readonly _userAuthService: UserAuthService,
    private readonly _cryptoRepository: ICryptoRepository,
    private readonly _cacheRepository: ICacheRepository,
    private readonly _sendEmailQueue: ISendEmailBullmqRepository,
  ) {}

  async execute(command: AuthRecoverPasswordCommand): Promise<{ success: string }> {
    // TODO: validate user
    const user = await this._userAuthService.execute(command.username);

    if (user) {
      // TODO: create token reset password in cache
      const token = this._cryptoRepository.token({ kind: 'ALPHANUMERIC' });
      const tokenHash = this._cryptoRepository.hash(token);
      await this._cacheRepository.set(`reset-password:${tokenHash}`, user._id, 600 * 1500); // expire in 15 minutes

      // TODO: send email
      const fullName = `${user.names} ${user.surnames}`.trim().trimStart().trimEnd();
      await this._sendEmailQueue.addJobResetPassword({ email: user.email, fullName, token });
    }

    // TODO: if everything is ok
    return { success: 'Si los datos son correctos, recibirás un correo con las instrucciones para restablecer su contraseña.' };
  }
}
