import { Prisma } from 'generated/prisma';

import { PrismaRepository } from 'src/shared/database/infrastructure/persistences';
import { IUserQueryRepository } from '../../domain/repositories/user-query.repository';
import { UserFindAllProjection, UserFindOneByIdProjection } from '../../domain/projections';
import { DataFindAll, Nullable } from 'src/shared/system/domain/system.interface';
import { UserFindAll, UserFindAllFilters } from '../../domain/user.interface';
import { FieldSearchType } from 'src/shared/database/domain/database.interface';
import { UserLoginProjection } from '../../domain/projections/user-login.projection';

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
   * @description Get all user by filters
   * @date 2025-12-26 19:40:34
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {UserFindAll} query
   * @returns {Promise<DataFindAll<UserFindAllProjection>>}
   */
  async findAll(query: UserFindAll): Promise<DataFindAll<UserFindAllProjection>> {
    const { page, limit, sortOrder, sort, filters, search } = query;

    const where: Prisma.UserWhereInput = { deletedAt: null };
    const total = await this._prisma.user.count({ where: where });

    // TODO: Field filter
    const fieldFilter: FieldSearchType<Prisma.UserScalarFieldEnum>[] = [
      { field: 'names', type: 'string' },
      { field: 'surnames', type: 'string' },
      { field: 'username', type: 'string' },
      { field: 'phone', type: 'string' },
      { field: 'email', type: 'string' },
      { field: 'status', type: 'boolean', callback: (_) => this.validateBolean(_) },
      { field: 'confirmed', type: 'boolean', callback: (_) => this.validateBolean(_) },
      { field: 'createdAt', type: 'Date' },
      { field: 'updatedAt', type: 'Date' },
    ] as const;

    // TODO: validate Filters
    if (search !== undefined) {
      where.OR = fieldFilter.map((_) => this._prisma.$utls.searchFilter(_, search)).filter((_) => _ !== null && _ !== undefined);
    } else if (filters !== undefined) {
      fieldFilter.forEach((_) => {
        const field = filters[_.field as keyof UserFindAllFilters];
        if (field === undefined || field.value === null || field.value === undefined) return;

        const filter = this._prisma.$utls.searchFilterField(_, field);
        if (filter == null) return;
        if (!Array.isArray(where.AND)) where.AND = [];
        where.AND.push(filter);
      });
    }

    // TODO: Total filter
    const totalFilters = await this._prisma.user.count({ where: { ...where } });

    // TODO: Get Users
    const result = await this._prisma.user.findMany({
      where,
      omit: { deletedAt: true, failedAttempts: true },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sort]: sortOrder },
    });

    return {
      meta: {
        total: total,
        filter: totalFilters != total ? totalFilters : undefined,
        page,
        lastPage: Math.ceil(total / limit),
      },
      data: result.map(
        (_) =>
          new UserFindAllProjection(
            _.id,
            _.names,
            _.surnames,
            _.username,
            _.phone,
            _.email,
            _.status,
            _.confirmed,
            _.avatar,
            _.lockUntil,
            _.createdAt,
            _.updatedAt,
          ),
      ),
    };
  }

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
      result.username,
      result.phone,
      result.email,
      result.avatar,
      result.confirmed,
      result.status,
      result.createdAt,
      result.updatedAt,
    );
  }

  async findOneByLogin(username: string): Promise<Nullable<UserLoginProjection>> {
    const where: Prisma.UserWhereInput = { deletedAt: null };
    if (username.includes('@')) where.email = username;
    else where.username = username;

    const result = await this._prisma.user.findFirst({ where, omit: { deletedAt: true } });
    if (!result) return null;

    return new UserLoginProjection(
      result.id,
      result.names,
      result.surnames,
      result.username,
      result.email,
      result.confirmed,
      result.status,
      result.failedAttempts,
      result.lockUntil,
      result.avatar,
    );
  }

  /**
   * @description Check if username exist
   * @date 2026-01-12 20:33:23
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {string} username
   * @param {?string} [id]
   * @returns {Promise<boolean>}
   */
  async conflictUsername(username: string, id?: string): Promise<boolean> {
    const result = await this._prisma.user.findFirst({
      where: { username, id: { not: id }, deletedAt: null },
      select: { id: true },
    });
    return result !== null;
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
  async conflictEmail(email: string, id?: string): Promise<boolean> {
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
  async conflictPhone(phone: string, id?: string): Promise<boolean> {
    const result = await this._prisma.user.findFirst({
      where: { phone, id: { not: id }, deletedAt: null },
      select: { id: true },
    });
    return result !== null;
  }

  private validateBolean(status: string): string | undefined | null {
    status = status?.toLowerCase();
    return status === 'activo' ? 'true' : status === 'inactivo' ? 'false' : null;
  }
}
