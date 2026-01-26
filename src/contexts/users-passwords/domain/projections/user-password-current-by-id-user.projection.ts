export class UserPasswordCurrentByIdUserProjection {
  /**
   * Creates an instance of UserPasswordCurrentByIdUserProjection.
   * @date 2026-01-17 18:10:23
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {string} password
   * @param {Date} createdAt
   */
  constructor(
    readonly password: string,
    readonly createdAt: Date,
  ) {}
}
