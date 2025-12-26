import { PrismaRepository } from 'src/shared/database/infrastructure/persistences';
import { IUserQueryRepository } from '../../domain/repositories/user-query.repository';
import { UserFindOneByIdProjection } from '../../domain/projections';
import { Nullable } from 'src/shared/system/domain/system.interface';

export class UserQueryRepositoryPostgres implements IUserQueryRepository {
  /**
   * Creates an instance of UserQueryRepositoryPostgres.
   * @date 2025-12-26 10:01:11
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {PrismaRepository} _prisma
   */
  constructor(private readonly _prisma: PrismaRepository) {}

  /**
   * @description Get User By Id
   * @date 2025-12-26 10:06:08
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {string} id
   * @returns {Promise<Nullable<UserFindOneByIdProjection>>}
   */
  async findOneById(id: string): Promise<Nullable<UserFindOneByIdProjection>> {
    const result = await this._prisma.user.findFirst({
      where: { id, deletedAt: null },
      omit: { deletedAt: true },
    });

    if (!result) return null;

    return new UserFindOneByIdProjection(
      result.id,
      result.names,
      result.surnames,
      result.birthday,
      result.phone,
      result.email,
      result.avatar,
      result.confirmed,
      result.status,
      result.createdAt,
      result.updatedAt,
    );
  }

  /**
   * @description Check if email exist
   * @date 2025-12-26 10:06:23
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {string} email
   * @param {?string} [id]
   * @returns {Promise<boolean>}
   */
  async checkEmailExist(email: string, id?: string): Promise<boolean> {
    const result = await this._prisma.user.findFirst({
      where: { email, id: { not: id }, deletedAt: null },
      select: { id: true },
    });
    return result !== null;
  }

  /**
   * @description Check if phone exist
   * @date 2025-12-26 10:06:31
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {string} phone
   * @param {?string} [id]
   * @returns {Promise<boolean>}
   */
  async checkPhoneExist(phone: string, id?: string): Promise<boolean> {
    const result = await this._prisma.user.findFirst({
      where: { phone, id: { not: id }, deletedAt: null },
      select: { id: true },
    });
    return result !== null;
  }
}
