import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import path from 'node:path';
import fs from 'node:fs';

import { QUEUE } from 'src/shared/system/domain/constants/queue.constant';
import { BullmqSendEmail } from '../../domain/interfaces/send-email.interface';
import { IEmailsRepository } from 'src/shared/emails/domain/emails.repository';

@Processor(QUEUE.EMAILS, { concurrency: 2 })
export class SendEmailWorker extends WorkerHost {
  /**
   * Creates an instance of SendEmailWorker.
   * @date 2026-01-24 09:46:38
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {IEmailsRepository} _sendEmailsRepository
   */
  constructor(private readonly _sendEmailsRepository: IEmailsRepository) {
    super();
  }

  async process(job: Job<BullmqSendEmail>): Promise<any> {
    const pathTemplate = path.join(process.cwd(), 'uploads/templates', 'send-code-verify.html');
    if (!fs.existsSync(pathTemplate)) throw new Error('Template not found');
    let template = fs.readFileSync(pathTemplate, 'utf-8');

    template = template.replace('{{CODE}}', job.data.code);
    const result = await this._sendEmailsRepository.sendEmail({
      to: job.data.email,
      subject: 'Hello ✔',
      html: template,
    });

    console.log(result);
    return job.data;
  }
}
