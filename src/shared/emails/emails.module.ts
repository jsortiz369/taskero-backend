import { Global, Module } from '@nestjs/common';

import { IEmailsRepository } from './domain/emails.repository';
import { EmailsRepository } from './infrastructure/persistences/emails.repository';
import { IEnvRepository } from '../env/domain/env.repository';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: IEmailsRepository,
      useFactory: (env: IEnvRepository) => new EmailsRepository(env),
      inject: [IEnvRepository],
    },
  ],
  exports: [IEmailsRepository],
})
export class EmailsModule {}
