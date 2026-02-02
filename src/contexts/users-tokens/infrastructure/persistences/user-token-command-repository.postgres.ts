import { PrismaRepository } from 'src/shared/database/infrastructure/persistences';
import { UserToken } from '../../domain/user-token';
import { IUserTokenCommandRepository } from '../../domain/repositories';

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
    await this._prisma.userTokens.create({
      data: {
        id: userToken._id._value,
        token: userToken.token,
        userId: userToken._idUser._value,
        expiresAt: userToken.expiresAtValue,
      },
    });

    return userToken;
  }
}
