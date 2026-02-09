export class UserPasswordFindAllByIdUserProjection {
  /**
   * Creates an instance of UserPasswordFindAllByIdUserProjection.
   * @date 2026-02-08 17:43:54
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {string} id
   * @param {string} userId
   * @param {string} password
   * @param {boolean} isCurrent
   * @param {Date} createdAt
   */
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly password: string,
    public readonly isCurrent: boolean,
    public readonly createdAt: Date,
  ) {}
}
