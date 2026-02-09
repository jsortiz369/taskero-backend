import { UserTokenEnum } from 'generated/prisma';

import { Nullable } from 'src/shared/system/domain/system.interface';
import { UserTokenCurrentProjection } from '../../domain/projections';
import { IUserTokenQueryRepository } from '../../domain/repositories';
import { PrismaRepository } from 'src/shared/database/infrastructure/persistences';
import { UserTokenTypes } from '../../domain/user-token.interface';

export class UserTokenQueryRepositoryPostgres implements IUserTokenQueryRepository {
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
   * @param {UserTokenTypes} typeToken
   * @returns {Promise<Nullable<UserTokenCurrentProjection>>}
   */
  async findCurrentByIdUser(idUser: string, typeToken: UserTokenTypes): Promise<Nullable<UserTokenCurrentProjection>> {
    const result = await this._prisma.userToken.findFirst({
      where: { userId: idUser, type: UserTokenEnum[typeToken] },
      orderBy: { expiresAt: 'desc' },
      select: { id: true, userId: true, token: true, expiresAt: true, used: true },
    });

    if (!result) return null;

    return new UserTokenCurrentProjection(result.id, result.userId, result.token, result.expiresAt, result.used);
  }

  /**
   * @description validate user by token
   * @date 2026-02-08 16:46:46
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {string} token
   * @param {UserTokenTypes} typeToken
   * @returns {Promise<Nullable<UserTokenCurrentProjection>>}
   */
  async findCurrentByToken(token: string, typeToken: UserTokenTypes): Promise<Nullable<UserTokenCurrentProjection>> {
    const result = await this._prisma.userToken.findFirst({
      where: { type: UserTokenEnum[typeToken], token },
      orderBy: { expiresAt: 'desc' },
      select: { id: true, userId: true, token: true, expiresAt: true, used: true },
    });

    if (!result) return null;
    return new UserTokenCurrentProjection(result.id, result.userId, result.token, result.expiresAt, result.used);
  }
}
