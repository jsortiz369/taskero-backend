import { InvalidValueException } from '../exceptions';

export abstract class DateValueObject<T extends Date | undefined | null> {
  readonly _value: T;

  /**
   * Creates an instance of DateValueObject.
   * @date 2025-12-25 19:51:04
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @protected
   * @param {T} value
   * @param {string} message
   */
  protected constructor(value: T, message: string) {
    this._value = value;
    this.isValidDate(message); // Ensure the value is a valid date
  }

  /**
   * @description Validate value is not null o undefined
   * @date 2025-12-25 19:52:44
   * @author Jogan Ortiz Muñoz
   *
   * @protected
   * @param {string} message
   */
  protected ensureIsDefined(message: string): void {
    if (this._value === null || this._value === undefined) throw new InvalidValueException(message);
  }

  /**
   * @description Validate date min
   * @date 2025-12-25 19:53:35
   * @author Jogan Ortiz Muñoz
   *
   * @protected
   * @param {Date} min
   * @param {string} message
   */
  protected min(min: Date, message: string) {
    if (this.existDate() && this._value! < min) throw new InvalidValueException(message);
  }

  /**
   * @description Validate date max
   * @date 2025-12-25 19:53:49
   * @author Jogan Ortiz Muñoz
   *
   * @protected
   * @param {Date} max
   * @param {string} message
   */
  protected max(max: Date, message: string) {
    if (this.existDate() && this._value! > max) throw new InvalidValueException(message);
  }

  /**
   * @description Validate date min and date max
   * @date 2025-12-25 19:56:11
   * @author Jogan Ortiz Muñoz
   *
   * @protected
   * @param {Date} min
   * @param {Date} max
   * @param {string} message
   */
  protected between(min: Date, max: Date, message: string) {
    if (this.existDate() && (this._value! < min || this._value! > max)) throw new InvalidValueException(message);
  }

  /**
   * @description Validate exist date
   * @date 2025-12-25 19:55:58
   * @author Jogan Ortiz Muñoz
   *
   * @private
   * @returns {boolean}
   */
  private existDate(): boolean {
    return this._value !== null && this._value !== undefined;
  }

  /**
   * @description Ensure the value is a valid date
   * @date 2025-12-25 19:54:01
   * @author Jogan Ortiz Muñoz
   *
   * @private
   * @param {string} message
   */
  private isValidDate(message: string): void {
    if (this._value === null || this._value === undefined) return;
    if (!(this._value instanceof Date) || isNaN(this._value?.getTime())) throw new InvalidValueException(message);
    return;
  }
}
