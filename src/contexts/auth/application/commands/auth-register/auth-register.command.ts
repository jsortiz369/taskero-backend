import { UserPrimitive } from 'src/contexts/users/domain/user.interface';

type TypeCommand = Omit<
  UserPrimitive,
  '_id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'confirmed' | 'failedAttempts' | 'lockUntil' | 'avatar' | 'status'
> & {
  password: string;
};

export class AuthRegisterCommand implements TypeCommand {
  /**
   * Creates an instance of AuthRegisterCommand.
   * @date 2026-01-08 20:05:59
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {TypeCommand['names']} names
   * @param {TypeCommand['surnames']} surnames
   * @param {TypeCommand['username']} username
   * @param {TypeCommand['phone']} phone
   * @param {TypeCommand['email']} email
   * @param {TypeCommand['password']} password
   */
  constructor(
    readonly names: TypeCommand['names'],
    readonly surnames: TypeCommand['surnames'],
    readonly username: TypeCommand['username'],
    readonly phone: TypeCommand['phone'],
    readonly email: TypeCommand['email'],
    readonly password: TypeCommand['password'],
  ) {}
}
