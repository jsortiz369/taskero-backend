import { PrismaRepository } from 'src/shared/database/infrastructure/persistences';
import { IUserRepository } from '../../domain/repositories';
import { UserEmail, UserId, UserPhone } from '../../domain/vo';
import { User } from '../../domain/user';

export class UserRepositoryPostgres implements IUserRepository {
  /**
   * Creates an instance of UserRepositoryPostgres.
   * @date 2025-12-26 06:36:21
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {PrismaRepository} _prisma
   */
  constructor(private readonly _prisma: PrismaRepository) {}

  /**
   * @description Get One User By Id
   * @date 2025-12-25 21:20:46
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {UserId} id
   * @returns {Promise<User | null>}
   */
  async findOneById(id: UserId): Promise<User | null> {
    const result = await this._prisma.user.findFirst({
      where: { id: id._value, deletedAt: null },
      omit: { deletedAt: true },
    });
    if (!result) return null;

    return User.fromPrimitives({
      _id: result.id,
      names: result.names,
      surnames: result.surnames,
      birthday: result.birthday,
      phone: result.phone,
      email: result.email,
      avatar: result.avatar,
      confirmed: result.confirmed,
      status: result.status,
      failedAttempts: result.failedAttempts,
      lockUntil: result.lockUntil,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
  }

  /**
   * @description Validate exist email
   * @date 2025-12-25 21:21:03
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {UserEmail} email
   * @param {?UserId} [_id]
   * @returns {Promise<boolean>}
   */
  async existByEmail(email: UserEmail, _id?: UserId): Promise<boolean> {
    const result = await this._prisma.user.findFirst({
      where: { email: email._value, id: { not: _id?._value }, deletedAt: null },
      select: { id: true },
    });
    return result !== null;
  }

  /**
   * @description Validate exist phone
   * @date 2025-12-25 21:23:06
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {UserPhone} phone
   * @param {?UserId} [_id]
   * @returns {Promise<boolean>}
   */
  async existByPhone(phone: UserPhone, _id?: UserId): Promise<boolean> {
    const result = await this._prisma.user.findFirst({
      where: { phone: phone._value, id: { not: _id?._value }, deletedAt: null },
      select: { id: true },
    });
    return result !== null;
  }

  /**
   * @description Create user
   * @date 2025-12-25 21:23:29
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {User} user
   * @returns {Promise<User>}
   */
  async create(user: User): Promise<User> {
    await this._prisma.user.create({
      data: {
        id: user._id._value,
        names: user.names._value,
        surnames: user.surnames._value,
        birthday: user.birthday._value,
        phone: user.phone?._value,
        email: user.email._value,
        avatar: user.avatar?._value,
        confirmed: user.confirmed?._value,
        status: user.status?._value,
        failedAttempts: user.failedAttemptsValue,
        lockUntil: user.lockUntilValue,
        createdAt: user.createdAtValue,
        updatedAt: user.updatedAtValue,
      },
    });

    return user;
  }

  /**
   * @description Update user
   * @date 2025-12-25 21:23:42
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {User} user
   * @returns {Promise<User>}
   */
  async update(user: User): Promise<User> {
    await this._prisma.user.update({
      data: {
        names: user.names._value,
        surnames: user.surnames._value,
        birthday: user.birthday._value,
        phone: user.phone._value,
        email: user.email._value,
        avatar: user.avatar._value,
        confirmed: user.confirmed._value,
        status: user.status._value,
        failedAttempts: user.failedAttemptsValue,
        lockUntil: user.lockUntilValue,
        createdAt: user.createdAtValue,
        updatedAt: user.updatedAtValue,
      },
      where: { id: user._id._value },
    });

    return user;
  }

  /**
   * @description Delete User By Id
   * @date 2025-12-25 21:23:55
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {UserId} id
   * @returns {Promise<User>}
   */
  async delete(id: UserId): Promise<User> {
    const deleted = new Date();

    const result = await this._prisma.user.update({
      data: {
        status: false,
        updatedAt: deleted,
        deletedAt: deleted,
      },
      where: { id: id._value },
      omit: { deletedAt: true },
    });

    return User.fromPrimitives({
      _id: result.id,
      names: result.names,
      surnames: result.surnames,
      birthday: result.birthday,
      phone: result.phone,
      email: result.email,
      avatar: result.avatar,
      confirmed: result.confirmed,
      status: result.status,
      failedAttempts: result.failedAttempts,
      lockUntil: result.lockUntil,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
  }
}
