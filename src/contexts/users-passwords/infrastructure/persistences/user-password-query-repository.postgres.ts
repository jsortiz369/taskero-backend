import { PrismaRepository } from 'src/shared/database/infrastructure/persistences';
import { IUserPasswordQueryRepository } from '../../domain/repositories/user-password-query.repository';
import { Nullable } from 'src/shared/system/domain/system.interface';
import { UserPasswordCurrentByIdUserProjection } from '../../domain/projections/user-password-current-by-id-user.projection';
import { UserPasswordFindAllByIdUserProjection } from '../../domain/projections';

export class UserPasswordQueryRepositoryPostgres implements IUserPasswordQueryRepository {
  /**
   * Creates an instance of UserPasswordQueryRepositoryPostgres.
   * @date 2026-01-17 17:47:20
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {PrismaRepository} _prisma
   */
  constructor(private readonly _prisma: PrismaRepository) {}

  async findCurrentByIdUser(idUser: string): Promise<Nullable<UserPasswordCurrentByIdUserProjection>> {
    const result = await this._prisma.userPassword.findFirst({
      where: { userId: idUser, isCurrent: true },
      select: { password: true, createdAt: true },
    });

    if (!result) return null;
    return new UserPasswordCurrentByIdUserProjection(result.password, result.createdAt);
  }

  async findAllByIdUser(idUser: string, limit: number): Promise<UserPasswordFindAllByIdUserProjection[]> {
    const result = await this._prisma.userPassword.findMany({
      where: { userId: idUser },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: { id: true, password: true, createdAt: true, isCurrent: true, userId: true },
    });

    return result.map((item) => new UserPasswordFindAllByIdUserProjection(item.id, item.userId, item.password, item.isCurrent, item.createdAt));
  }
}
