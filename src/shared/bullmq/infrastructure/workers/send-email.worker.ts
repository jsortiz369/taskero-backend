import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import path from 'node:path';
import fs from 'node:fs';

import { QUEUE } from 'src/shared/system/domain/constants/queue.constant';
import { SendEmailConfirmAccount, SendEmailResetPassword } from '../../domain/interfaces/send-email.interface';
import { IEmailsRepository } from 'src/shared/emails/domain/emails.repository';
import { IEnvRepository } from 'src/shared/env/domain/env.repository';

@Processor(QUEUE.EMAILS.NAME, { concurrency: 2 })
export class SendEmailWorker extends WorkerHost {
  /**
   * Creates an instance of SendEmailWorker.
   * @date 2026-01-24 09:46:38
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {IEnvRepository} _envRepository
   * @param {IEmailsRepository} _sendEmailsRepository
   */
  constructor(
    private readonly _envRepository: IEnvRepository,
    private readonly _sendEmailsRepository: IEmailsRepository,
  ) {
    super();
  }

  async process(job: Job<SendEmailConfirmAccount | SendEmailResetPassword>) {
    if (job.name === QUEUE.EMAILS.PROCESS.CONFIRM_ACCOUNT) return this.processConfirmAccount(job as Job<SendEmailConfirmAccount>);
    return this.processResetPassword(job as Job<SendEmailResetPassword>);
  }

  private async processConfirmAccount(job: Job<SendEmailConfirmAccount>) {
    const pathTemplate = path.join(process.cwd(), 'uploads/templates', 'send-code-verify.html');
    if (!fs.existsSync(pathTemplate)) throw new Error('Template not found');
    let template = fs.readFileSync(pathTemplate, 'utf-8');

    template = template.replace('{{CODE}}', job.data.code);
    const result = await this._sendEmailsRepository.sendEmail({
      to: job.data.email,
      subject: '👋 Bienvenido a Taskero — confirma tu cuenta',
      html: template,
    });

    console.log(result);
    return job.data;
  }

  private async processResetPassword(job: Job<SendEmailResetPassword>) {
    const pathTemplate = path.join(process.cwd(), 'uploads/templates', 'reset-password.html');
    if (!fs.existsSync(pathTemplate)) throw new Error('Template not found');
    let template = fs.readFileSync(pathTemplate, 'utf-8');

    // TODO: validate link
    const link = this._envRepository.get('APP_URL') + '/auth/reset-password?token=' + job.data.token;

    template = template.replace('{{NAME}}', job.data.fullName);
    template = template.replace('{{LINK}}', link);

    const result = await this._sendEmailsRepository.sendEmail({
      to: job.data.email,
      subject: '🔐 Restablece tu contraseña en Taskero',
      html: template,
    });

    console.log(result);
    return job.data;
  }
}
