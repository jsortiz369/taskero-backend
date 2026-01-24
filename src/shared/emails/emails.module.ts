import { Global, Module } from '@nestjs/common';
import { IEmailsRepository } from './domain/emails.repository';
import { EmailsRepository } from './infrastructure/persistences/emails.repository';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: IEmailsRepository,
      useClass: EmailsRepository,
    },
  ],
  exports: [IEmailsRepository],
})
export class EmailsModule {}
