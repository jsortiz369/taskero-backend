import { InvalidValueException } from '../exceptions';

export class BooleanValueObject<T extends boolean | undefined | null> {
  readonly _value: T;

  /**
   * Creates an instance of BooleanValueObject.
   * @date 2025-12-25 19:50:58
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @protected
   * @param {T} value
   * @param {string} message
   */
  protected constructor(value: T, message: string) {
    this._value = value;
    this.isValidBoolean(message); // Ensure the value is a valid boolean
  }

  /**
   * @description Ensure the value is a valid boolean
   * @date 2025-12-25 19:57:05
   * @author Jogan Ortiz Muñoz
   *
   * @private
   * @param {string} message
   */
  private isValidBoolean(message: string): void {
    if (this._value === null || this._value === undefined) return;
    if (typeof this._value !== 'boolean') throw new InvalidValueException(message);
    return;
  }
}
