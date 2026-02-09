export class AuthResetPasswordCommand {
  /**
   * Creates an instance of AuthResetPasswordCommand.
   * @date 2026-02-08 16:52:32
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {string} token
   * @param {string} password
   */
  constructor(
    public readonly token: string,
    public readonly password: string,
  ) {}
}
