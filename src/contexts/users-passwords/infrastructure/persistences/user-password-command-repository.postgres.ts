import { PrismaRepository } from 'src/shared/database/infrastructure/persistences';
import { IUserPasswordCommandRepository } from '../../domain/repositories/user-password-command.repository';
import { UserPassword } from '../../domain/user-password';
import { UserId } from 'src/contexts/users/domain/vo';

export class UserPasswordCommandRepositoryPostgres implements IUserPasswordCommandRepository {
  /**
   * Creates an instance of UserPasswordCommandRepositoryPostgres.
   * @date 2025-12-27 17:26:34
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {PrismaRepository} _prisma
   */
  constructor(private readonly _prisma: PrismaRepository) {}

  /**
   * @description Create new password by user
   * @date 2026-01-26 06:45:34
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {UserPassword} userPassword
   * @returns {Promise<UserPassword>}
   */
  async create(userPassword: UserPassword): Promise<UserPassword> {
    await this._prisma.userPasswords.create({
      data: {
        id: userPassword._id._value,
        userId: userPassword._idUser._value,
        password: userPassword.password._value,
        isCurrent: userPassword.isCurrentValue,
        createdAt: userPassword.createdAtValue,
      },
    });

    return userPassword;
  }

  async disableCreatedPasswordsByUserId(userId: UserId): Promise<void> {
    await this._prisma.userPasswords.update({
      where: { userId: userId._value, isCurrent: true },
      data: { isCurrent: false },
    });
  }
}
