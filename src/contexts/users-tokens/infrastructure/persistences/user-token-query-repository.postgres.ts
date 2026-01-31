import { Nullable } from 'src/shared/system/domain/system.interface';
import { UserTokenCurrentByIdUserProjection } from '../../domain/projections';
import { UserTokenQueryRepository } from '../../domain/repositories/user-token-query.repository';
import { PrismaRepository } from 'src/shared/database/infrastructure/persistences';

export class UserTokenQueryRepositoryPostgres implements UserTokenQueryRepository {
  /**
   * Creates an instance of UserTokenQueryRepositoryPostgres.
   * @date 2026-01-31 07:45:59
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {PrismaRepository} _prisma
   */
  constructor(private readonly _prisma: PrismaRepository) {}

  /**
   * @description get token by id user
   * @date 2026-01-31 07:45:46
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {string} idUser
   * @returns {Promise<Nullable<UserTokenCurrentByIdUserProjection>>}
   */
  async findCurrentByIdUser(idUser: string): Promise<Nullable<UserTokenCurrentByIdUserProjection>> {
    const result = await this._prisma.userTokens.findFirst({
      where: { userId: idUser },
      orderBy: { expiresAt: 'desc' },
      select: { token: true, expiresAt: true },
    });

    if (!result) return null;

    return new UserTokenCurrentByIdUserProjection(result.token, result.expiresAt);
  }
}
