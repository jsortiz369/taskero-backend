import { Job } from 'bullmq';
import { SendEmailConfirmAccount, SendEmailResetPassword } from '../interfaces/send-email.interface';

export abstract class ISendEmailBullmqRepository {
  /**
   * @description Registe new job
   * @date 2026-02-07 07:29:21
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {SendEmailConfirmAccount} data
   * @returns {Promise<Job<any, any, string>>}
   */
  abstract addJobConfirmAccount(data: SendEmailConfirmAccount): Promise<Job<any, any, string>>;

  /**
   * @description Register new job by reset password
   * @date 2026-02-08 15:52:37
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {SendEmailResetPassword} data
   * @returns {Promise<Job<any, any, string>>}
   */
  abstract addJobResetPassword(data: SendEmailResetPassword): Promise<Job<any, any, string>>;
}
