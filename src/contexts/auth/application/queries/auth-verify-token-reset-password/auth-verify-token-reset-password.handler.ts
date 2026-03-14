import { UserTokenValidateTokenService } from 'src/contexts/users-tokens/domain/services';
import { AuthVerifyTokenResetPasswordQuery } from './auth-verify-token-reset-password.query';

export class AuthVerifyTokenResetPasswordHandler {
  constructor(private readonly _userTokenValidateTokenService: UserTokenValidateTokenService) {}

  async execute(query: AuthVerifyTokenResetPasswordQuery): Promise<{ success: boolean }> {
    await this._userTokenValidateTokenService.execute(query.token, 'RESET_PASSWORD');
    return { success: true };
  }
}
