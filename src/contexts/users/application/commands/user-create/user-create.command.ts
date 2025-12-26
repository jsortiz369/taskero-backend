import { UserPrimitive } from 'src/contexts/users/domain/user.interface';

type TypeCommand = Omit<
  UserPrimitive,
  '_id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'confirmed' | 'failedAttempts' | 'lockUntil' | 'avatar' | 'status'
> & {
  password: string;
};

export class UserCreateCommand implements TypeCommand {
  /**
   * Creates an instance of UserCreateCommand.
   * @date 2025-12-26 07:17:19
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {TypeCommand['names']} names
   * @param {TypeCommand['surnames']} surnames
   * @param {TypeCommand['birthday']} birthday
   * @param {TypeCommand['phone']} phone
   * @param {TypeCommand['email']} email
   * @param {TypeCommand['password']} password
   */
  constructor(
    readonly names: TypeCommand['names'],
    readonly surnames: TypeCommand['surnames'],
    readonly birthday: TypeCommand['birthday'],
    readonly phone: TypeCommand['phone'],
    readonly email: TypeCommand['email'],
    readonly password: TypeCommand['password'],
  ) {}
}
