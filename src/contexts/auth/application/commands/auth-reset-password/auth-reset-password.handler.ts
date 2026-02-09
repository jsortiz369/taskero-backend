import { UserTokenUpdateUsedService, UserTokenValidateTokenService } from 'src/contexts/users-tokens/domain/services';
import { AuthResetPasswordCommand } from './auth-reset-password.command';
import { UserPasswordCreateService } from 'src/contexts/users-passwords/domain/services';

export class AuthResetPasswordHandler {
  /**
   * Creates an instance of AuthResetPasswordHandler.
   * @date 2026-02-08 17:32:39
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserTokenValidateTokenService} _userTokenValidateTokenService
   * @param {UserPasswordCreateService} _passwordCreate
   * @param {UserTokenUpdateUsedService} _updatedUsedTokenService
   */
  constructor(
    private readonly _userTokenValidateTokenService: UserTokenValidateTokenService,
    private readonly _passwordCreate: UserPasswordCreateService,
    private readonly _updatedUsedTokenService: UserTokenUpdateUsedService,
  ) {}

  async execute(command: AuthResetPasswordCommand): Promise<{ success: true }> {
    // TODO: validate token
    const result = await this._userTokenValidateTokenService.execute(command.token, 'RESET_PASSWORD');

    // TODO: create password
    await this._passwordCreate.execute(result._idUser, command.password);

    // TODO: update token used
    await this._updatedUsedTokenService.execute(result._id);

    // TODO: if everything is ok
    return { success: true };
  }
}
