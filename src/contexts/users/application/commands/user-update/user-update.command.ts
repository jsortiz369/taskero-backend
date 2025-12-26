import { DataNotEmptyException } from 'src/shared/system/domain/exceptions';
import { UserCreateCommand } from '../user-create';
import { UserPrimitive } from 'src/contexts/users/domain/user.interface';

type TypeCommand = Partial<Omit<InstanceType<typeof UserCreateCommand>, 'password'> & Pick<UserPrimitive, 'status' | 'confirmed'>>;

export class UserUpdateCommand implements Partial<UserCreateCommand> {
  /**
   * Creates an instance of UserUpdateCommand.
   * @date 2025-12-26 10:52:59
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {TypeCommand['names']} names
   * @param {TypeCommand['surnames']} surnames
   * @param {TypeCommand['birthday']} birthday
   * @param {TypeCommand['phone']} phone
   * @param {TypeCommand['email']} email
   * @param {TypeCommand['status']} status
   * @param {TypeCommand['confirmed']} confirmed
   */
  constructor(
    readonly names: TypeCommand['names'],
    readonly surnames: TypeCommand['surnames'],
    readonly birthday: TypeCommand['birthday'],
    readonly phone: TypeCommand['phone'],
    readonly email: TypeCommand['email'],
    readonly status: TypeCommand['status'],
    readonly confirmed: TypeCommand['confirmed'],
  ) {
    this.validateExistDataUpdate();
  }

  /**
   * @description Validate exist data for update
   * @date 2025-12-26 10:53:09
   * @author Jogan Ortiz Muñoz
   *
   * @private
   */
  private validateExistDataUpdate() {
    const data = Object.values(this).filter((value) => value !== undefined);
    if (data.length === 0) throw new DataNotEmptyException();
  }
}
