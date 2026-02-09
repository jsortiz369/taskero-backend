import { UserTokenEnum } from 'generated/prisma';

import { PrismaRepository } from 'src/shared/database/infrastructure/persistences';
import { UserToken } from '../../domain/user-token';
import { IUserTokenCommandRepository } from '../../domain/repositories';
import { UserTokenId } from '../../domain/vo';

export class UserTokenCommandRepositoryPostgres implements IUserTokenCommandRepository {
  /**
   * Creates an instance of UserTokenCommandRepositoryPostgres.
   * @date 2026-01-26 06:43:49
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {PrismaRepository} _prisma
   */
  constructor(private readonly _prisma: PrismaRepository) {}

  /**
   * @description Create new token y user
   * @date 2026-01-26 06:45:51
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {UserToken} userToken
   * @returns {Promise<UserToken>}
   */
  async create(userToken: UserToken): Promise<UserToken> {
    await this._prisma.userToken.create({
      data: {
        id: userToken._id._value,
        type: UserTokenEnum[userToken.typeValue],
        token: userToken.token,
        userId: userToken._idUser._value,
        expiresAt: userToken.expiresAtValue,
      },
    });

    return userToken;
  }

  /**
   * @description Update token to used
   * @date 2026-02-08 20:37:47
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {UserTokenId} userTokenId
   * @returns {Promise<void>}
   */
  async updateToUsed(userTokenId: UserTokenId): Promise<void> {
    await this._prisma.userToken.update({
      where: { id: userTokenId._value },
      data: { used: true },
    });
  }
}
