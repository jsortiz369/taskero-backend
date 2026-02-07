import { UserTokenEnum } from 'generated/prisma';

import { Nullable } from 'src/shared/system/domain/system.interface';
import { UserTokenCurrentByIdUserProjection } from '../../domain/projections';
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
   * @returns {Promise<Nullable<UserTokenCurrentByIdUserProjection>>}
   */
  async findCurrentByIdUser(idUser: string, typeToken: UserTokenTypes): Promise<Nullable<UserTokenCurrentByIdUserProjection>> {
    let type: UserTokenEnum = UserTokenEnum.CONFIRM_ACCOUNT;
    if (typeToken === 'LOGIN_EXTRA') type = UserTokenEnum.LOGIN_EXTRA;
    if (typeToken === 'RESET_PASSWORD') type = UserTokenEnum.RESET_PASSWORD;

    const result = await this._prisma.userTokens.findFirst({
      where: { userId: idUser, type: type },
      orderBy: { expiresAt: 'desc' },
      select: { token: true, expiresAt: true },
    });

    if (!result) return null;

    return new UserTokenCurrentByIdUserProjection(result.token, result.expiresAt);
  }
}
