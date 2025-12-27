import { UserCreatePrimitive, UserPrimitive } from './user.interface';
import * as vo from './vo';

export class User {
  /**
   * Creates an instance of User.
   * @date 2025-12-25 20:37:13
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {vo.UserId} _idVO
   * @param {vo.UserNames} namesVO
   * @param {vo.UserSurnames} surnamesVO
   * @param {vo.UserBirthday} birthdayVO
   * @param {vo.UserPhone} phoneVO
   * @param {vo.UserEmail} emailVO
   * @param {vo.UserAvatar} avatarVO
   * @param {vo.UserConfirmed} confirmedVO
   * @param {vo.UserStatus} statusVO
   * @param {(number | null)} failedAttemptsVO
   * @param {(Date | null)} lockUntilVO
   * @param {vo.UserCreatedAt} createdAtVO
   * @param {vo.UserUpdatedAt} updatedAtVO
   * @param {?vo.UserDeletedAt} [deletedAtVO]
   */
  constructor(
    private readonly _idVO: vo.UserId,
    private namesVO: vo.UserNames,
    private surnamesVO: vo.UserSurnames,
    private birthdayVO: vo.UserBirthday,
    private phoneVO: vo.UserPhone,
    private emailVO: vo.UserEmail,
    private avatarVO: vo.UserAvatar,
    private confirmedVO: vo.UserConfirmed,
    private statusVO: vo.UserStatus,
    private failedAttempts: number | null,
    private lockUntil: Date | null,
    private createdAt: Date,
    private updatedAt: Date,
    private deletedAt: Date | null,
  ) {}

  /**
   * @description Creates a new User entity.
   * @date 2025-12-25 20:50:03
   * @author Jogan Ortiz Muñoz
   *
   * @static
   * @param {UserCreatePrimitive} primitive
   * @returns {User}
   */
  static create(primitive: UserCreatePrimitive): User {
    const newCreatedAt = new Date();
    return new User(
      new vo.UserId(primitive._id),
      new vo.UserNames(primitive.names),
      new vo.UserSurnames(primitive.surnames),
      new vo.UserBirthday(primitive.birthday),
      new vo.UserPhone(primitive.phone),
      new vo.UserEmail(primitive.email),
      new vo.UserAvatar(primitive.avatar),
      new vo.UserConfirmed(primitive.confirmed),
      new vo.UserStatus(primitive.status),
      0,
      null,
      newCreatedAt,
      newCreatedAt,
      null,
    );
  }

  /**
   * @description Creates a User entity from its primitive representation.
   * @date 2025-12-25 20:49:52
   * @author Jogan Ortiz Muñoz
   *
   * @static
   * @param {UserPrimitive} primitive
   * @returns {User}
   */
  static fromPrimitives(primitive: UserPrimitive): User {
    return new User(
      new vo.UserId(primitive._id),
      new vo.UserNames(primitive.names),
      new vo.UserSurnames(primitive.surnames),
      new vo.UserBirthday(primitive.birthday),
      new vo.UserPhone(primitive.phone),
      new vo.UserEmail(primitive.email),
      new vo.UserAvatar(primitive.avatar),
      new vo.UserConfirmed(primitive.confirmed),
      new vo.UserStatus(primitive.status),
      primitive?.failedAttempts ?? null,
      primitive?.lockUntil ?? null,
      primitive.createdAt,
      primitive.updatedAt,
      primitive.deletedAt ?? null,
    );
  }

  /**
   * @description Converts the User entity to its primitive representation.
   * @date 2025-12-25 20:49:43
   * @author Jogan Ortiz Muñoz
   *
   * @returns {UserPrimitive}
   */
  toValuesPrimitives(): UserPrimitive {
    return {
      _id: this._idVO._value,
      names: this.namesVO._value,
      surnames: this.surnamesVO._value,
      birthday: this.birthdayVO._value,
      phone: this.phoneVO._value,
      email: this.emailVO._value,
      avatar: this.avatarVO._value,
      confirmed: this.confirmedVO._value,
      status: this.statusVO._value,
      failedAttempts: this.failedAttempts ?? null,
      lockUntil: this.lockUntil,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  /*========== Getters =================*/

  get _id(): vo.UserId {
    return this._idVO;
  }

  get names(): vo.UserNames {
    return this.namesVO;
  }

  get surnames(): vo.UserSurnames {
    return this.surnamesVO;
  }

  get birthday(): vo.UserBirthday {
    return this.birthdayVO;
  }

  get phone(): vo.UserPhone {
    return this.phoneVO;
  }

  get email(): vo.UserEmail {
    return this.emailVO;
  }

  get avatar(): vo.UserAvatar {
    return this.avatarVO;
  }

  get confirmed(): vo.UserConfirmed {
    return this.confirmedVO;
  }

  get status(): vo.UserStatus {
    return this.statusVO;
  }

  get failedAttemptsValue(): number | null {
    return this.failedAttempts;
  }

  get lockUntilValue(): Date | null {
    return this.lockUntil;
  }

  get createdAtValue(): Date {
    return this.createdAt;
  }

  get updatedAtValue(): Date {
    return this.updatedAt;
  }

  get deletedAtValue(): Date | null {
    return this.deletedAt;
  }

  /*========== Setters =================*/
  set names(names: InstanceType<typeof vo.UserNames>['_value']) {
    this.namesVO = new vo.UserNames(names);
    this.updatedAt = new Date();
  }

  set surnames(surnames: InstanceType<typeof vo.UserSurnames>['_value']) {
    this.surnamesVO = new vo.UserSurnames(surnames);
    this.updatedAt = new Date();
  }

  set birthday(birthday: InstanceType<typeof vo.UserBirthday>['_value']) {
    this.birthdayVO = new vo.UserBirthday(birthday);
    this.updatedAt = new Date();
  }

  set phone(phone: InstanceType<typeof vo.UserPhone>['_value']) {
    this.phoneVO = new vo.UserPhone(phone);
    this.updatedAt = new Date();
  }

  set email(email: InstanceType<typeof vo.UserEmail>['_value']) {
    this.emailVO = new vo.UserEmail(email);
    this.updatedAt = new Date();
  }

  set avatar(avatar: InstanceType<typeof vo.UserAvatar>['_value']) {
    this.avatarVO = new vo.UserAvatar(avatar);
    this.updatedAt = new Date();
  }

  set confirmed(confirmed: InstanceType<typeof vo.UserConfirmed>['_value']) {
    this.confirmedVO = new vo.UserConfirmed(confirmed);
    this.updatedAt = new Date();
  }

  set status(status: InstanceType<typeof vo.UserStatus>['_value']) {
    this.statusVO = new vo.UserStatus(status);
    this.updatedAt = new Date();
  }

  set failedAttemptsValue(failedAttempts: number | null) {
    this.failedAttempts = failedAttempts;
    this.updatedAt = new Date();
  }

  set lockUntilValue(lockUntil: Date | null) {
    this.lockUntil = lockUntil;
    this.updatedAt = new Date();
  }
}
