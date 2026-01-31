export class UserTokenCurrentByIdUserProjection {
  /**
   * Creates an instance of UserTokenCurrentByIdUserProjection.
   * @date 2026-01-31 07:38:56
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {string} token
   * @param {Date} expiresAt
   */
  constructor(
    readonly token: string,
    readonly expiresAt: Date,
  ) {}
}
