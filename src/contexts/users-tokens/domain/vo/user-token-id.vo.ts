import { UuidValueObject } from 'src/shared/system/domain/vo';
import { UserTokenPrimitive } from '../user-token.interface';

type UserTokenIdProp = UserTokenPrimitive['_id'];
export class UserTokenId extends UuidValueObject {
  /**
   * Creates an instance of UserTokenId.
   * @date 2026-01-26 06:35:06
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserTokenIdProp} value
   */
  constructor(value: UserTokenIdProp) {
    super(value, 'El id del token no es válido, debe ser un uuid.');
  }
}
