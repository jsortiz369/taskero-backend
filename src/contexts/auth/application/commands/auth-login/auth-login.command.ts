export class AuthLoginCommand {
  /**
   * Creates an instance of AuthLoginCommand.
   * @date 2026-01-17 11:57:49
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {string} username
   * @param {string} password
   * @param {string} ip
   * @param {string} browser
   * @param {string} device
   * @param {string} os
   */
  constructor(
    public readonly username: string,
    public readonly password: string,
    public readonly ip: string,
    public readonly browser: string,
    public readonly version?: string,
    public readonly device?: string,
    public readonly os?: string,
  ) {}
}
