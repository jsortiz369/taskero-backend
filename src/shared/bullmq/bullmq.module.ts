import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

import { IEnvRepository } from '../env/domain/env.repository';
import { SendEmailRepository } from './infrastructure/persistences/send-email.repository';
import { ISendEmailBullmqRepository } from './domain/repositories/send-email.repository';
import { QUEUE } from '../system/domain/constants/queue.constant';
import { SendEmailWorker } from './infrastructure/workers/send-email.worker';
import { IEmailsRepository } from '../emails/domain/emails.repository';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: (env: IEnvRepository) => ({
        connection: {
          host: env.get('REDIS_HOST'),
          port: env.get('REDIS_PORT'),
          password: env.get('REDIS_PASSWORD'),
          db: 1,
        },
      }),
      inject: [IEnvRepository],
    }),
    BullModule.registerQueue({ name: QUEUE.EMAILS.NAME }),
  ],
  providers: [
    {
      provide: ISendEmailBullmqRepository,
      useClass: SendEmailRepository,
    },
    {
      provide: SendEmailWorker,
      useFactory: (_envRepository: IEnvRepository, _sendEmailsRepository: IEmailsRepository) =>
        new SendEmailWorker(_envRepository, _sendEmailsRepository),
      inject: [IEnvRepository, IEmailsRepository],
    },
  ],
  exports: [ISendEmailBullmqRepository],
})
export class BullMqModule {}
