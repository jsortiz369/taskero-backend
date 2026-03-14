import { UserAuthService } from 'src/contexts/users/domain/services';
import { AuthRecoverPasswordCommand } from './auth-recover-password.command';
import { UserTokenCreateService } from 'src/contexts/users-tokens/domain/services';
import { ISendEmailBullmqRepository } from 'src/shared/bullmq/domain/repositories/send-email.repository';

export class AuthRecoverPasswordHandler {
  /**
   * Creates an instance of AuthRecoverPasswordHandler.
   * @date 2026-02-08 14:19:03
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserAuthService} _userAuthService
   * @param {UserTokenCreateService} _userTokenCreateService
   * @param {ISendEmailBullmqRepository} _sendEmailQueue
   */
  constructor(
    private readonly _userAuthService: UserAuthService,
    private readonly _userTokenCreateService: UserTokenCreateService,
    private readonly _sendEmailQueue: ISendEmailBullmqRepository,
  ) {}

  async execute(command: AuthRecoverPasswordCommand): Promise<{ success: string }> {
    // TODO: validate user
    const user = await this._userAuthService.execute(command.username);

    if (user) {
      // TODO: create token to reset password by user
      const token = await this._userTokenCreateService.execute(user._id, 'RESET_PASSWORD');

      // TODO: send email
      const fullName = `${user.names} ${user.surnames}`.trim().trimStart().trimEnd();
      await this._sendEmailQueue.addJobResetPassword({ email: user.email, fullName, token });
    }

    // TODO: if everything is ok
    return { success: 'Si los datos son correctos, recibirás un correo con las instrucciones para restablecer su contraseña.' };
  }
}
