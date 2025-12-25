export abstract class LoggerRepository {
  /**
   * @description show the messages
   * @date 2025-12-22 06:45:47
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {*} message
   * @param {?string} [context]
   */
  abstract log(message: any, context?: string): void;

  /**
   * @description Show error messages
   * @date 2025-12-22 06:46:43
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
   * @date 2025-12-22 06:47:08
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {*} message
   * @param {?string} [context]
   */
  abstract warn(message: any, context?: string): void;
}
