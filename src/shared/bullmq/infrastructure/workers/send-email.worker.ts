import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { QUEUE } from 'src/shared/system/domain/constants/queue.constant';

@Processor(QUEUE.EMAILS, { concurrency: 5 })
export class SendEmailWorker extends WorkerHost {
  constructor() {
    super();
  }

  async process(job: Job, token?: string): Promise<any> {
    console.log('SendEmailWorker');
  }
}
