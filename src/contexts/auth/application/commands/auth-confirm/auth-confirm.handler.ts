import { UserQueryFindOneByIdService } from 'src/contexts/users/domain/services';
import { AuthConfirmCommand } from './auth-confirm.command';
import { AccountAlreadyConfirmedException } from 'src/contexts/auth/domain/exceptions';
import { UserTokenCompareService } from 'src/contexts/users-tokens/domain/services';

export class AuthConfirmHandler {
  constructor(
    private readonly _userQueryFindOneByIdService: UserQueryFindOneByIdService,
    private readonly _userTokenCompareService: UserTokenCompareService,
  ) {}

  async execute(command: AuthConfirmCommand) {
    // TODO: valdate exists user by id
    const user = await this._userQueryFindOneByIdService.execute(command.idUser);

    // TODO: validate user hasn't confirmed account
    if (user.confirmed) throw new AccountAlreadyConfirmedException();

    // TODO: validate token exists by user id and compare token
    await this._userTokenCompareService.execute(command.idUser, command.otp);

    // TODO: confirm account
    console.log(`Account confirmed for user ID: ${command.idUser}`);

    return Promise.resolve('Account confirmed successfully');
  }
}
