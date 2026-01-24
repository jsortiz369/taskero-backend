import { createTransport, Transporter } from 'nodemailer';
import SESTransport from 'nodemailer/lib/ses-transport';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { IEmailsRepository } from '../../domain/emails.repository';
import { DataSendEmail } from '../../domain/emails.interfaces';
import { IEnvRepository } from 'src/shared/env/domain/env.repository';

export class EmailsRepository implements IEmailsRepository {
  private readonly _transporter: Transporter<SESTransport.SentMessageInfo | SMTPTransport.Options>;
  private readonly _envRepository: IEnvRepository;

  /**
   * Creates an instance of EmailsRepository.
   * @date 2026-01-24 09:02:25
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   */
  constructor(_envRepository: IEnvRepository) {
    this._envRepository = _envRepository;
    this._transporter = createTransport({
      host: _envRepository.get('MSTP_HOST'),
      port: _envRepository.get('MSTP_PORT'),
      auth: {
        user: _envRepository.get('MSTP_USER'),
        pass: _envRepository.get('MSTP_PASSWORD'),
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
      from: this._envRepository.get('MSTP_USER'),
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html,
    });

    if (!info || !info.messageId) return null;
    return info.messageId;
  }
}
