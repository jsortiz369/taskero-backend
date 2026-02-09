export class UserTokenCurrentProjection {
  /**
   * Creates an instance of UserTokenCurrentProjection.
   * @date 2026-02-08 20:52:07
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {string} _id
   * @param {string} _idUser
   * @param {string} token
   * @param {Date} expiresAt
   * @param {boolean} [used]
   */
  constructor(
    readonly _id: string,
    readonly _idUser: string,
    readonly token: string,
    readonly expiresAt: Date,
    readonly used: boolean,
  ) {}
}
