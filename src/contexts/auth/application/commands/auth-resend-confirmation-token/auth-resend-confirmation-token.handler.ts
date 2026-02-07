import { UserQueryFindOneByIdService } from 'src/contexts/users/domain/services';
import { AuthResendConfirmationTokenCommand } from './auth-resend-confirmation-token.command';
import { UserTokenCreateService } from 'src/contexts/users-tokens/domain/services';
import { ISendEmailBullmqRepository } from 'src/shared/bullmq/domain/repositories/send-email.repository';

export class AuthResendConfirmationTokenHandler {
  /**
   * Creates an instance of AuthResendConfirmationTokenHandler.
   * @date 2026-02-02 07:09:23
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserQueryFindOneByIdService} _userQueryFindOneByIdService
   * @param {UserTokenCreateService} _userTokenCreateService
   * @param {ISendEmailBullmqRepository} _sendEmailQueue
   */
  constructor(
    private readonly _userQueryFindOneByIdService: UserQueryFindOneByIdService,
    private readonly _userTokenCreateService: UserTokenCreateService,
    private readonly _sendEmailQueue: ISendEmailBullmqRepository,
  ) {}

  async execute(command: AuthResendConfirmationTokenCommand): Promise<{ success: boolean }> {
    // TODO: valdate exists user by id
    const user = await this._userQueryFindOneByIdService.execute(command.idUser);

    // TODO: create token to confirm account
    const token = await this._userTokenCreateService.execute(user._id, 'CONFIRM_ACCOUNT');
    await this._sendEmailQueue.addJobConfirmAccount({ email: user.email, code: token });

    return { success: true };
  }
}
