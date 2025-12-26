export abstract class ILoggerRepository {
  /**
   * @description show the messages
   * @date 2025-12-26 06:44:33
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {*} message
   * @param {?string} [context]
   */
  abstract log(message: any, context?: string): void;

  /**
   * @description Show error messages
   * @date 2025-12-26 06:44:46
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {*} message
   * @param {?string} [stack]
   * @param {?string} [context]
   */
  abstract error(message: any, stack?: string, context?: string): void;

  /**
   * @description show warning messages
   * @date 2025-12-26 06:44:54
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {*} message
   * @param {?string} [context]
   */
  abstract warn(message: any, context?: string): void;
}
