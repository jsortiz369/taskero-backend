import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import { EnvModule } from 'src/shared/env/env.module';

@Module({
  imports: [EnvModule, HttpModule],
})
export class AppModule {}
