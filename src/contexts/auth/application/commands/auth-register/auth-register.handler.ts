import { UserCreateService } from 'src/contexts/users/domain/services';
import { AuthRegisterCommand } from './auth-register.command';
import { IJwtRepository } from 'src/shared/jwt/domain/jwt.repository';
import { ISendEmailBullmqRepository } from 'src/shared/bullmq/domain/repositories/send-email.repository';
import { ICacheRepository } from 'src/shared/cache/domain/cache.repository';
import { ICryptoRepository } from 'src/shared/crypto/domain/crypto.repository';

export class AuthRegisterHandler {
  /**
   * Creates an instance of AuthRegisterHandler.
   * @date 2026-01-08 20:07:44
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserCreateService} _userCreate
   * @param {IJwtRepository} _jwtRepository
   * @param {ICryptoRepository} _cryptoRepository
   * @param {ICacheRepository} _cacheRepository
   * @param {ISendEmailBullmqRepository} _sendEmailQueue
   */
  constructor(
    private readonly _userCreate: UserCreateService,
    private readonly _jwtRepository: IJwtRepository,
    private readonly _cryptoRepository: ICryptoRepository,
    private readonly _cacheRepository: ICacheRepository,
    private readonly _sendEmailQueue: ISendEmailBullmqRepository,
  ) {}

  async execute(command: AuthRegisterCommand): Promise<{ tokenConfirm: string }> {
    // TODO: create user
    const result = await this._userCreate.execute(command);
    const userPrimitive = result.toValuesPrimitives();

    // TODO: create token to confirm account
    const token = this._cryptoRepository.token({ kind: 'NUMBER' });
    const tokenHash = this._cryptoRepository.hash(token);
    await this._cacheRepository.set(`confirm-account:${userPrimitive._id}`, tokenHash, 600 * 1500); // expire in 15 minutes
    await this._sendEmailQueue.addJobConfirmAccount({ email: userPrimitive.email, code: token });

    // TODO: create token confirmed account
    return { tokenConfirm: this._jwtRepository.generateConfirmAccount({ sub: userPrimitive._id }) };
  }
}
