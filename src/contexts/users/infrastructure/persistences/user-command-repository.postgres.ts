import { PrismaRepository } from 'src/shared/database/infrastructure/persistences';
import { IUserCommandRepository } from '../../domain/repositories';
import { UserId } from '../../domain/vo';
import { User } from '../../domain/user';

export class UserCommandRepositoryPostgres implements IUserCommandRepository {
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
        username: user.username._value,
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
        username: user.username._value,
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
      where: { id: user._id._value, deletedAt: null },
    });

    return user;
  }

  async updateLoginAttempts(_id: UserId, attempts: number): Promise<void> {
    // TODO: Update login attempts and lock if attempts >= 5
    let lockUntil: null | Date = null;
    if (attempts >= 5) {
      lockUntil = new Date();
      lockUntil.setMinutes(lockUntil.getMinutes() + 15);
    }

    await this._prisma.user.update({
      data: { failedAttempts: attempts, lockUntil },
      where: { id: _id._value, deletedAt: null },
    });
  }

  /**
   * @description Delete User By Id
   * @date 2025-12-25 21:23:55
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {UserId} userId
   * @returns {Promise<User>}
   */
  async delete(userId: UserId): Promise<User> {
    // TODO: Get email and phone before delete
    const user = await this._prisma.user.findUnique({ where: { id: userId._value }, select: { email: true, phone: true } });

    const emailSplit = user!.email.split('@');
    const emailDeleted = `${emailSplit[0]}_deleted@${emailSplit[1]}`;
    const phoneDeleted = `${user!.phone}_deleted`;
    const deleted = new Date();
    const userDeleted = await this._prisma.user.update({
      data: {
        status: false,
        updatedAt: deleted,
        deletedAt: deleted,
        email: emailDeleted,
        phone: phoneDeleted,
      },
      where: { id: userId._value, deletedAt: null },
      omit: { deletedAt: true },
    });

    return User.fromPrimitives({
      _id: userDeleted.id,
      names: userDeleted.names,
      surnames: userDeleted.surnames,
      username: userDeleted.username,
      phone: userDeleted.phone.replace('_deleted', ''),
      email: userDeleted.email.replace('_deleted', ''),
      avatar: userDeleted.avatar,
      confirmed: userDeleted.confirmed,
      status: userDeleted.status,
      createdAt: userDeleted.createdAt,
      updatedAt: userDeleted.updatedAt,
    });
  }
}
