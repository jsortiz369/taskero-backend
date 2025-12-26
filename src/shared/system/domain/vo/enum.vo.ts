import { InvalidValueException } from '../exceptions';

export abstract class EnumValueObject<T extends Record<string, any> | null | undefined> {
  readonly _value: T[keyof T];

  /**
   * Creates an instance of EnumValueObject.
   * @date 2025-12-25 19:51:10
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {T[keyof T]} value
   * @param {Required<T>} enumType
   * @param {string} message
   */
  constructor(value: T[keyof T], enumType: Required<T>, message: string) {
    this._value = value;
    this.isEnum(enumType, message); // Ensure the value is a valid enum value
  }

  /**
   * @description Ensure the value is defined
   * @date 2025-12-25 19:57:24
   * @author Jogan Ortiz Muñoz
   *
   * @protected
   * @param {string} message
   */
  protected ensureIsDefined(message: string): void {
    if (this._value === null || this._value === undefined) throw new InvalidValueException(message);
  }

  /**
   * @description Ensure the value is a valid enum value
   * @date 2025-12-25 19:58:14
   * @author Jogan Ortiz Muñoz
   *
   * @private
   * @param {Required<T>} enumType
   * @param {string} message
   */
  private isEnum(enumType: Required<T>, message: string): void {
    if (this._value === null || this._value === undefined) return;
    if (!Object.values(enumType).includes(this._value)) throw new InvalidValueException(message);
  }
}
