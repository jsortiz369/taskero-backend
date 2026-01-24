import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

import { IEnvRepository } from '../env/domain/env.repository';
import { SendEmailRepository } from './infrastructure/persistences/send-email.repository';
import { ISendEmailBullmqRepository } from './domain/repositories/send-email.repository';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: (env: IEnvRepository) => ({
        connection: {
          host: env.get('REDIS_HOST'),
          port: env.get('REDIS_PORT'),
        },
      }),
      inject: [IEnvRepository],
    }),
  ],
  providers: [
    {
      provide: ISendEmailBullmqRepository,
      useClass: SendEmailRepository,
    },
  ],
  exports: [ISendEmailBullmqRepository],
})
export class BullMqModule {}
