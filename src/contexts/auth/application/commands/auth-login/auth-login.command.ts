export class AuthLoginCommand {
  /**
   * Creates an instance of AuthLoginCommand.
   * @date 2026-01-17 11:57:49
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {string} username
   * @param {string} password
   */
  constructor(
    public readonly username: string,
    public readonly password: string,
  ) {}
}
