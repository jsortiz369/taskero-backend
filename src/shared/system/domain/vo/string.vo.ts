import { InvalidValueException } from '../exceptions';

export abstract class StringValueObject<T extends string | undefined | null> {
  readonly _value: T;

  /**
   * Creates an instance of StringValueObject.
   * @date 2025-12-25 19:51:16
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @protected
   * @param {T} value
   * @param {string} message
   */
  protected constructor(value: T, message: string, config?: { capitalize?: boolean }) {
    value = (!value ? value : value.replace(/\s+/g, ' ').trim()) as T;
    this._value = value;
    this.isString(message); // Ensure the value is a string
    if (config && config.capitalize) this._value = this.capitalize();
  }

  /**
   * @description Ensures that the string is not empty or only whitespace.
   * @date 2025-12-25 19:58:35
   * @author Jogan Ortiz Muñoz
   *
   * @protected
   * @param {string} message
   */
  protected ensureNotEmpty(message: string): void {
    if (this._value === '' || this._value?.trim() === '') throw new InvalidValueException(message);
  }

  /**
   * @description Validate value is not null o undefined
   * @date 2025-12-25 19:59:05
   * @author Jogan Ortiz Muñoz
   *
   * @protected
   * @param {string} message
   */
  protected ensureIsDefined(message: string): void {
    if (this._value === null || this._value === undefined) throw new InvalidValueException(message);
  }

  /**
   * @description Ensure the value matches the provided regular expression
   * @date 2025-12-25 19:59:20
   * @author Jogan Ortiz Muñoz
   *
   * @protected
   * @param {RegExp} regex
   * @param {string} message
   */
  protected ensureIsFulfillRegExp(regex: RegExp, message: string): void {
    if (this._value !== null && this._value !== undefined && !regex.test(this._value)) throw new InvalidValueException(message);
  }

  /**
   * @description Ensure the value length is between min and max
   * @date 2025-12-25 19:59:38
   * @author Jogan Ortiz Muñoz
   *
   * @protected
   * @param {number} min
   * @param {number} max
   * @param {string} message
   */
  protected length(min: number, max: number, message: string) {
    if (this.min(min) || this.max(max)) throw new InvalidValueException(message);
  }

  /**
   * @description Ensure the value length is at least min
   * @date 2025-12-25 20:00:00
   * @author Jogan Ortiz Muñoz
   *
   * @protected
   * @param {number} min
   * @param {string} message
   */
  protected minLength(min: number, message: string) {
    if (this.min(min)) throw new InvalidValueException(message);
  }

  /**
   * @description Ensure the value length does not exceed max
   * @date 2025-12-25 20:00:14
   * @author Jogan Ortiz Muñoz
   *
   * @protected
   * @param {number} max
   * @param {string} message
   */
  protected maxLength(max: number, message: string) {
    if (this.max(max)) throw new InvalidValueException(message);
  }

  protected capitalize(): T {
    if (typeof this._value !== 'string') return this._value;

    const textSplit = this._value.split(' ').filter((word) => word !== '');
    return textSplit.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ') as T;
  }

  /**
   * @description Ensure the value length is at least min
   * @date 2025-12-25 20:00:59
   * @author Jogan Ortiz Muñoz
   *
   * @private
   * @param {number} min
   * @returns {boolean}
   */
  private min(min: number): boolean {
    return this._value !== undefined && this._value !== null && this._value.length < min;
  }

  /**
   * @description Ensure the value length does not exceed max
   * @date 2025-12-25 20:01:25
   * @author Jogan Ortiz Muñoz
   *
   * @private
   * @param {number} limit
   * @returns {boolean}
   */
  private max(limit: number): boolean {
    return this._value !== undefined && this._value !== null && this._value.length > limit;
  }

  /**
   * @description Ensure the value is a string
   * @date 2025-12-25 20:01:32
   * @author Jogan Ortiz Muñoz
   *
   * @private
   * @param {string} message
   */
  private isString(message: string): void {
    if (this._value === null || this._value === undefined) return;
    if (typeof this._value !== 'string') throw new InvalidValueException(message);
    return;
  }
}
