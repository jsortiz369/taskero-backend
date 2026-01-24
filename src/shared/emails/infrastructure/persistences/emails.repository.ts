import { createTransport, Transporter } from 'nodemailer';
import SESTransport from 'nodemailer/lib/ses-transport';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { IEmailsRepository } from '../../domain/emails.repository';
import { DataSendEmail } from '../../domain/emails.interfaces';

export class EmailsRepository implements IEmailsRepository {
  private readonly _transporter: Transporter<SESTransport.SentMessageInfo | SMTPTransport.Options>;

  /**
   * Creates an instance of EmailsRepository.
   * @date 2026-01-24 09:02:25
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   */
  constructor() {
    this._transporter = createTransport({
      host: 'smtp.mailersend.net',
      port: 2525,
      auth: {
        user: 'MS_TEqUw3@test-68zxl27ekn94j905.mlsender.net',
        pass: 'mssp.TwjOhiS.jpzkmgqeyn2g059v.gn6rpz6',
      },
    });
  }

  /**
   * @description Send emails
   * @date 2026-01-24 08:53:59
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {DataSendEmail} data
   * @returns {Promise<string|null>}
   */
  async sendEmail(data: DataSendEmail): Promise<string | null> {
    const info = await this._transporter.sendMail({
      from: 'MS_TEqUw3@test-68zxl27ekn94j905.mlsender.net',
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html,
    });

    if (!info || !info.messageId) return null;
    return info.messageId;
  }
}
