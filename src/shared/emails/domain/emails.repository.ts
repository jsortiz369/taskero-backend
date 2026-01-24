import { DataSendEmail } from './emails.interfaces';

export abstract class IEmailsRepository {
  /**
   * @description Send emails
   * @date 2026-01-24 08:51:21
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {DataSendEmail} data
   * @returns {Promise<string|null>}
   */
  abstract sendEmail(data: DataSendEmail): Promise<string | null>;
}
