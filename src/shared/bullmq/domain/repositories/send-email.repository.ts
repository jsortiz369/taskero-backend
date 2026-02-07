import { Job } from 'bullmq';
import { BullmqSendEmail } from '../interfaces/send-email.interface';

export abstract class ISendEmailBullmqRepository {
  /**
   * @description Registe new job
   * @date 2026-02-07 07:29:21
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {BullmqSendEmail} data
   * @returns {Promise<Job<any, any, string>>}
   */
  abstract addJobConfirmAccount(data: BullmqSendEmail): Promise<Job<any, any, string>>;
}
