import { UserQueryFindOneByIdService } from 'src/contexts/users/domain/services';
import { AuthResendConfirmationTokenCommand } from './auth-resend-confirmation-token.command';
import { ISendEmailBullmqRepository } from 'src/shared/bullmq/domain/repositories/send-email.repository';
import { AccountAlreadyConfirmedException } from 'src/contexts/auth/domain/exceptions';
import { ICryptoRepository } from 'src/shared/crypto/domain/crypto.repository';
import { ICacheRepository } from 'src/shared/cache/domain/cache.repository';

export class AuthResendConfirmationTokenHandler {
  /**
   * Creates an instance of AuthResendConfirmationTokenHandler.
   * @date 2026-02-02 07:09:23
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserQueryFindOneByIdService} _userQueryFindOneByIdService
   * @param {ICryptoRepository} _cryptoRepository
   * @param {ICacheRepository} _cacheRepository
   * @param {ISendEmailBullmqRepository} _sendEmailQueue
   */
  constructor(
    private readonly _userQueryFindOneByIdService: UserQueryFindOneByIdService,
    private readonly _cryptoRepository: ICryptoRepository,
    private readonly _cacheRepository: ICacheRepository,
    private readonly _sendEmailQueue: ISendEmailBullmqRepository,
  ) {}

  async execute(command: AuthResendConfirmationTokenCommand): Promise<{ success: true }> {
    // TODO: valdate exists user by id
    const user = await this._userQueryFindOneByIdService.execute(command.idUser);

    // TODO: validate user hasn't confirmed account
    if (user.confirmed) throw new AccountAlreadyConfirmedException();

    // TODO: create token to confirm account
    const token = this._cryptoRepository.token({ kind: 'NUMBER' });
    const tokenHash = this._cryptoRepository.hash(token);
    await this._cacheRepository.delete(`confirm-account:${user._id}`); // delete previous token if exists
    await this._cacheRepository.set(`confirm-account:${user._id}`, tokenHash, 600 * 1500); // expire in 15 minutes

    // TODO: send email
    await this._sendEmailQueue.addJobConfirmAccount({ email: user.email, code: token });

    return { success: true };
  }
}
