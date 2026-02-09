import { UserQueryFindOneByIdService, UserUpdateConfirmService } from 'src/contexts/users/domain/services';
import { AuthConfirmCommand } from './auth-confirm.command';
import { AccountAlreadyConfirmedException } from 'src/contexts/auth/domain/exceptions';
import { UserTokenCompareService, UserTokenUpdateUsedService } from 'src/contexts/users-tokens/domain/services';
import { IJwtRepository } from 'src/shared/jwt/domain/jwt.repository';

export class AuthConfirmHandler {
  /**
   * Creates an instance of AuthConfirmHandler.
   * @date 2026-02-02 07:01:33
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserQueryFindOneByIdService} _userQueryFindOneByIdService
   * @param {UserTokenCompareService} _userTokenCompareService
   * @param {UserUpdateConfirmService} _userUpdateConfirmService
   * @param {IJwtRepository} _jwtRepository
   */
  constructor(
    private readonly _userQueryFindOneByIdService: UserQueryFindOneByIdService,
    private readonly _userTokenCompareService: UserTokenCompareService,
    private readonly _userUpdateConfirmService: UserUpdateConfirmService,
    private readonly _jwtRepository: IJwtRepository,
    private readonly _updatedUsedTokenService: UserTokenUpdateUsedService,
  ) {}

  async execute(command: AuthConfirmCommand) {
    // TODO: valdate exists user by id
    const user = await this._userQueryFindOneByIdService.execute(command.idUser);

    // TODO: validate user hasn't confirmed account
    if (user.confirmed) throw new AccountAlreadyConfirmedException();

    // TODO: validate token exists by user id and compare token
    const resultToken = await this._userTokenCompareService.execute(command.idUser, command.otp, 'CONFIRM_ACCOUNT');

    // TODO: confirm account
    await this._userUpdateConfirmService.execute(command.idUser);

    // TODO: update token used
    await this._updatedUsedTokenService.execute(resultToken._id);

    // TODO: generate tokens
    const payload = { username: user.username, sub: user._id };
    const token = this._jwtRepository.generate(payload);
    const tokenRefresh = this._jwtRepository.generateRefresh(payload);

    return {
      token: token,
      tokenRefresh: tokenRefresh,
      data: {
        names: user.names,
        surnames: user.surnames,
        username: user.username,
        email: user.email,
      },
    };
  }
}
