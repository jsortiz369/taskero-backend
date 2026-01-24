import { Job } from 'bullmq';

export abstract class IBullmqRepository<T extends object = any> {
  /**
   * @description Registe new job
   * @date 2026-01-23 22:55:34
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {T} data
   * @returns {Promise<Job<any, any, string>>}
   */
  abstract addJob(data: T): Promise<Job<any, any, string>>;
}
