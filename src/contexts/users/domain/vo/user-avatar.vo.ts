import { StringValueObject } from 'src/shared/system/domain/vo';
import { UserPrimitive } from '../user.interface';

type UserAvatarProp = UserPrimitive['avatar'];
export class UserAvatar extends StringValueObject<UserAvatarProp> {
  /**
   * Creates an instance of UserAvatar.
   * @date 2025-12-25 19:48:20
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserAvatarProp} value
   */
  constructor(value: UserAvatarProp) {
    super(value, 'El avatar no es válido, debe ser cadena de texto.');

    this.maxLength(255, 'El avatar debe tener menos de 255 caracteres');
  }
}
