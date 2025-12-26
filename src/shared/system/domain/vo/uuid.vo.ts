import { InvalidUuidException } from '../exceptions';

const REGEX_UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export abstract class UuidValueObject {
  readonly _value: string;

  /**
   * Creates an instance of UuidValueObject.
   * @date 2025-12-25 19:51:22
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {string} value
   * @param {string} message
   */
  constructor(value: string, message: string) {
    this._value = value;
    this.isUuid(message); // Ensure the value is a valid UUID
  }

  /**
   * @description Ensure the value is a valid UUID
   * @date 2025-12-25 20:01:56
   * @author Jogan Ortiz Muñoz
   *
   * @private
   * @param {string} message
   */
  private isUuid(message: string): void {
    if (typeof this._value !== 'string' || REGEX_UUID.test(this._value) === false) throw new InvalidUuidException(message);
    return;
  }
}
