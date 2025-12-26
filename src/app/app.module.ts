import { Module } from '@nestjs/common';

import { HttpModule } from './http/http.module';
import { EnvModule } from 'src/shared/env/env.module';
import { ContextsModule } from 'src/contexts/contexts.module';

@Module({
  imports: [EnvModule, HttpModule, ContextsModule],
})
export class AppModule {}
