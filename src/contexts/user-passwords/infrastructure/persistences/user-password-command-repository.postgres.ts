import { PrismaRepository } from 'src/shared/database/infrastructure/persistences';
import { IUserPasswordCommandRepository } from '../../domain/repositories/user-password-command.repository';
import { UserPassword } from '../../domain/user-password';

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

    return Promise.resolve(userPassword);
  }
}
