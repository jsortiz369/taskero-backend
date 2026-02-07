import { UserId } from 'src/contexts/users/domain/vo';
import * as vo from './vo';
import { UserTokenCreatePrimitive, UserTokenPrimitive, UserTokenTypes } from './user-token.interface';

export class UserToken {
  /**
   * Creates an instance of UserToken.
   * @date 2026-01-26 06:38:45
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {vo.UserTokenId} _idVO
   * @param {UserId} userIdVO
   * @param {string} tokenVO
   * @param {Date} expiresAt
   */
  constructor(
    private readonly _idVO: vo.UserTokenId,
    private userIdVO: UserId,
    private type: UserTokenTypes,
    private tokenVO: string,
    private expiresAt: Date,
  ) {}

  static create(primitive: UserTokenCreatePrimitive): UserToken {
    return new UserToken(new vo.UserTokenId(primitive._id), new UserId(primitive.userId), primitive.type, primitive.token, primitive.expiresAt);
  }

  static fromPrimitives(primitive: UserTokenPrimitive): UserToken {
    return new UserToken(new vo.UserTokenId(primitive._id), new UserId(primitive.userId), primitive.type, primitive.token, primitive.expiresAt);
  }

  toValuesPrimitives(): { _id: string; userId: string; token: string; expiresAt: Date } {
    return {
      _id: this._idVO._value,
      userId: this.userIdVO._value,
      token: this.tokenVO,
      expiresAt: this.expiresAt,
    };
  }

  /*========== Getters =================*/
  get _id(): vo.UserTokenId {
    return this._idVO;
  }

  get _idUser(): UserId {
    return this.userIdVO;
  }

  get token(): string {
    return this.tokenVO;
  }

  get expiresAtValue(): Date {
    return this.expiresAt;
  }

  get typeValue(): UserTokenTypes {
    return this.type;
  }
}
