import { sendEmail } from '../interfaces/send-email.interface';
import { IBullmqRepository } from './bullmq.repository';

export abstract class ISendEmailBullmqRepository extends IBullmqRepository<sendEmail> {}
