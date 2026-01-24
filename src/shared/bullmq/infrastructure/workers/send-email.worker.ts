import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import path from 'node:path';
import fs from 'node:fs';

import { QUEUE } from 'src/shared/system/domain/constants/queue.constant';
import { sendEmail } from '../../domain/interfaces/send-email.interface';
import { IEmailsRepository } from 'src/shared/emails/domain/emails.repository';

@Processor(QUEUE.EMAILS, { concurrency: 2 })
export class SendEmailWorker extends WorkerHost {
  constructor(private readonly _sendEmailsRepository: IEmailsRepository) {
    super();
  }

  async process(job: Job<sendEmail>): Promise<any> {
    const pathTemplate = path.join(process.cwd(), 'uploads/templates', 'send-code-verify.html');
    if (!fs.existsSync(pathTemplate)) throw new Error('Template not found');
    let template = fs.readFileSync(pathTemplate, 'utf-8');

    template = template.replace('{{CODE}}', '123456');
    const result = await this._sendEmailsRepository.sendEmail({
      to: 'jogansmitho@gmail.com',
      subject: 'Hello ✔',
      html: template,
    });

    console.log(result);

    /* const transporter = createTransport({
      host: 'smtp.mailersend.net',
      port: 2525,
      auth: {
        user: 'MS_TEqUw3@test-68zxl27ekn94j905.mlsender.net',
        pass: 'mssp.TwjOhiS.jpzkmgqeyn2g059v.gn6rpz6',
      },
    });

    template = template.replace(' {{CODE}}', '123456');
    const info = await transporter.sendMail({
      from: 'MS_TEqUw3@test-68zxl27ekn94j905.mlsender.net',
      to: 'jogansmitho@gmail.com',
      subject: 'Hello ✔',
      html: template,
    });
 */
    //console.log(info.messageId);
    return job.data;
  }
}
