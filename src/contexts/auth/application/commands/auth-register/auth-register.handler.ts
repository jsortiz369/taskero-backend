import { UserCreateService } from 'src/contexts/users/domain/services';
import { AuthRegisterCommand } from './auth-register.command';

export class AuthRegisterHandler {
  /**
   * Creates an instance of AuthRegisterHandler.
   * @date 2026-01-08 20:07:44
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserCreateService} _userCreate
   */
  constructor(private readonly _userCreate: UserCreateService) {}

  async execute(command: AuthRegisterCommand) {
    // TODO: create user
    const result = await this._userCreate.execute(command);
    const userPrimitive = result.toValuesPrimitives();

    return {
      username: userPrimitive.username,
      email: userPrimitive.email,
    };
  }
}
