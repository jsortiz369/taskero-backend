import { UserCreateService } from 'src/contexts/users/domain/services';
import { AuthRegisterCommand } from './auth-register.command';
import { IJwtRepository } from 'src/shared/jwt/domain/jwt.repository';
import { UserTokenCreateService } from 'src/contexts/users-tokens/domain/services';
import { ISendEmailBullmqRepository } from 'src/shared/bullmq/domain/repositories/send-email.repository';

export class AuthRegisterHandler {
  /**
   * Creates an instance of AuthRegisterHandler.
   * @date 2026-01-08 20:07:44
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserCreateService} _userCreate
   * @param {IJwtRepository} _jwtRepository
   * @param {UserTokenCreateService} _userTokenCreateService
   * @param {ISendEmailBullmqRepository} _sendEmailQueue
   */
  constructor(
    private readonly _userCreate: UserCreateService,
    private readonly _jwtRepository: IJwtRepository,
    private readonly _userTokenCreateService: UserTokenCreateService,
    private readonly _sendEmailQueue: ISendEmailBullmqRepository,
  ) {}

  async execute(command: AuthRegisterCommand): Promise<{ tokenConfirm: string }> {
    // TODO: create user
    const result = await this._userCreate.execute(command);
    const userPrimitive = result.toValuesPrimitives();

    // TODO: create token to confirm account
    const token = await this._userTokenCreateService.execute(userPrimitive._id);
    await this._sendEmailQueue.addJob({ email: userPrimitive.email, code: token });

    // TODO: create token confirmed account
    return { tokenConfirm: this._jwtRepository.generateConfirmAccount({ sub: userPrimitive._id }) };
  }
}
