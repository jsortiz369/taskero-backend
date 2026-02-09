import { InjectQueue } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';

import { SendEmailConfirmAccount, SendEmailResetPassword } from '../../domain/interfaces/send-email.interface';
import { QUEUE } from 'src/shared/system/domain/constants/queue.constant';
import { ISendEmailBullmqRepository } from '../../domain/repositories/send-email.repository';

export class SendEmailRepository implements ISendEmailBullmqRepository {
  /**
   * Creates an instance of SendEmailRepository.
   * @date 2026-01-23 22:57:56
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {Queue} queue
   */
  constructor(@InjectQueue(QUEUE.EMAILS.NAME) private readonly queue: Queue) {}

  /**
   * @description Registe new job
   * @date 2026-01-23 22:57:44
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {SendEmailConfirmAccount} data
   * @returns {Promise<Job<any, any, string>>}
   */
  async addJobConfirmAccount(data: SendEmailConfirmAccount): Promise<Job<any, any, string>> {
    return this.queue.add(QUEUE.EMAILS.PROCESS.CONFIRM_ACCOUNT, data);
  }

  /**
   * @description Register new job by reset password
   * @date 2026-02-08 15:53:29
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {SendEmailResetPassword} data
   * @returns {Promise<Job<any, any, string>>}
   */
  async addJobResetPassword(data: SendEmailResetPassword): Promise<Job<any, any, string>> {
    return this.queue.add(QUEUE.EMAILS.PROCESS.RESET_PASSWORD, data);
  }
}
