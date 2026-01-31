export class AuthConfirmCommand {
  /**
   * Creates an instance of AuthConfirmCommand.
   * @date 2026-01-31 07:22:21
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {string} otp
   * @param {string} idUser
   */
  constructor(
    public readonly otp: string,
    public readonly idUser: string,
  ) {}
}
