import { UserPrimitive } from '../user.interface';

type TypeProjection = Omit<UserPrimitive, 'deletedAt'>;

export class UserLoginProjection {
  /**
   * Creates an instance of UserLoginProjection.
   * @date 2026-01-17 17:21:46
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {NonNullable<Required<TypeProjection['_id']>>} _id
   * @param {TypeProjection['names']} names
   * @param {TypeProjection['surnames']} surnames
   * @param {TypeProjection['username']} username
   * @param {TypeProjection['email']} email
   * @param {TypeProjection['confirmed']} confirmed
   * @param {TypeProjection['status']} status
   * @param {TypeProjection['failedAttempts']} failedAttempts
   * @param {TypeProjection['lockUntil']} lockUntil
   * @param {TypeProjection['avatar']} avatar
   */
  constructor(
    readonly _id: NonNullable<Required<TypeProjection['_id']>>,
    readonly names: TypeProjection['names'],
    readonly surnames: TypeProjection['surnames'],
    readonly username: TypeProjection['username'],
    readonly email: TypeProjection['email'],
    readonly confirmed: TypeProjection['confirmed'],
    readonly status: TypeProjection['status'],
    readonly failedAttempts: TypeProjection['failedAttempts'],
    readonly lockUntil: TypeProjection['lockUntil'],
    readonly avatar: TypeProjection['avatar'],
  ) {}
}
