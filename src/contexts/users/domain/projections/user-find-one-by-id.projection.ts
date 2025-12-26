import { UserPrimitive } from '../user.interface';

type TypeProjection = Omit<UserPrimitive, 'deletedAt'>;
export class UserFindOneByIdProjection implements TypeProjection {
  /**
   * Creates an instance of UserFindOneByIdProjection.
   * @date 2025-12-26 09:57:01
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {NonNullable<Required<TypeProjection['_id']>>} _id
   * @param {TypeProjection['names']} names
   * @param {TypeProjection['surnames']} surnames
   * @param {TypeProjection['birthday']} birthday
   * @param {TypeProjection['phone']} phone
   * @param {TypeProjection['email']} email
   * @param {TypeProjection['avatar']} avatar
   * @param {TypeProjection['confirmed']} confirmed
   * @param {TypeProjection['status']} status
   * @param {TypeProjection['createdAt']} createdAt
   * @param {TypeProjection['updatedAt']} updatedAt
   */
  constructor(
    readonly _id: NonNullable<Required<TypeProjection['_id']>>,
    readonly names: TypeProjection['names'],
    readonly surnames: TypeProjection['surnames'],
    readonly birthday: TypeProjection['birthday'],
    readonly phone: TypeProjection['phone'],
    readonly email: TypeProjection['email'],
    readonly avatar: TypeProjection['avatar'],
    readonly confirmed: TypeProjection['confirmed'],
    readonly status: TypeProjection['status'],
    readonly createdAt: TypeProjection['createdAt'],
    readonly updatedAt: TypeProjection['updatedAt'],
  ) {}
}
