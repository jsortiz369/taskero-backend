import { Module } from '@nestjs/common';

import { HttpModule } from './http/http.module';
import { EnvModule } from 'src/shared/env/env.module';
import { ContextsModule } from 'src/contexts/contexts.module';
import { DatabaseModule } from 'src/shared/database/database.module';
import { JwtModule } from 'src/shared/jwt/jwt.module';
import { SystemModule } from 'src/shared/system/system.module';
import { BullMqModule } from 'src/shared/bullmq/bullmq.module';
import { EmailsModule } from 'src/shared/emails/emails.module';

@Module({
  imports: [EnvModule, JwtModule, SystemModule, EmailsModule, BullMqModule, DatabaseModule, HttpModule, ContextsModule],
})
export class AppModule {}
