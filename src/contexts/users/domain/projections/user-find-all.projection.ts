import { UserPrimitive } from '../user.interface';

type TypeProjection = Omit<UserPrimitive, 'deletedAt' | 'failedAttempts'>;
export class UserFindAllProjection implements TypeProjection {
  /**
   * Creates an instance of UserFindAllProjection.
   * @date 2025-12-26 16:46:04
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {NonNullable<Required<TypeProjection['_id']>>} _id
   * @param {TypeProjection['names']} names
   * @param {TypeProjection['surnames']} surnames
   * @param {TypeProjection['username']} username
   * @param {TypeProjection['phone']} phone
   * @param {TypeProjection['email']} email
   * @param {TypeProjection['status']} status
   * @param {TypeProjection['confirmed']} confirmed
   * @param {TypeProjection['avatar']} avatar
   * @param {TypeProjection['lockUntil']} lockUntil
   * @param {TypeProjection['createdAt']} createdAt
   * @param {TypeProjection['updatedAt']} updatedAt
   */
  constructor(
    readonly _id: NonNullable<Required<TypeProjection['_id']>>,
    readonly names: TypeProjection['names'],
    readonly surnames: TypeProjection['surnames'],
    readonly username: TypeProjection['username'],
    readonly phone: TypeProjection['phone'],
    readonly email: TypeProjection['email'],
    readonly status: TypeProjection['status'],
    readonly confirmed: TypeProjection['confirmed'],
    readonly avatar: TypeProjection['avatar'],
    readonly lockUntil: TypeProjection['lockUntil'],
    readonly createdAt: TypeProjection['createdAt'],
    readonly updatedAt: TypeProjection['updatedAt'],
  ) {}
}
