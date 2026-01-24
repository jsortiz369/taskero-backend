export abstract class ITimezoneRepository {
  /**
   * @description Convert to UTC
   * @date 2026-01-23 12:34:55
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {Date} date
   * @param {?string} [timezone]
   * @returns {Date}
   */
  abstract convertToUtc(date: Date, timezone?: string): Date;
}
