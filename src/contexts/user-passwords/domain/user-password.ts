import { UserId } from 'src/contexts/users/domain/vo';
import * as vo from './vo';
import { UserPasswordPrimitive } from './user-password.interface';

export class UserPassword {
  constructor(
    private readonly _idVO: vo.UserPasswordId,
    private userIdVO: UserId,
    private passwordVO: vo.UserPasswordPassword,
    private isCurrent: boolean,
    private createdAt: Date,
  ) {}

  static create(primitive: UserPasswordPrimitive): UserPassword {
    const newCreatedAt = new Date();
    return new UserPassword(
      new vo.UserPasswordId(primitive._id),
      new UserId(primitive.userId),
      new vo.UserPasswordPassword(primitive.password),
      true,
      newCreatedAt,
    );
  }

  static fromPrimitives(primitive: UserPasswordPrimitive): UserPassword {
    return new UserPassword(
      new vo.UserPasswordId(primitive._id),
      new UserId(primitive.userId),
      new vo.UserPasswordPassword(primitive.password),
      primitive.isCurrent,
      primitive.createdAt,
    );
  }

  toValuesPrimitives(): UserPasswordPrimitive {
    return {
      _id: this._idVO._value,
      userId: this.userIdVO._value,
      password: this.passwordVO._value,
      isCurrent: this.isCurrent,
      createdAt: this.createdAt,
    };
  }

  /*========== Getters =================*/
  get _id(): vo.UserPasswordId {
    return this._idVO;
  }

  get _idUser(): UserId {
    return this.userIdVO;
  }

  get password(): vo.UserPasswordPassword {
    return this.passwordVO;
  }

  get isCurrentPassword(): boolean {
    return this.isCurrent;
  }

  get createdAtValue(): Date {
    return this.createdAt;
  }
}
