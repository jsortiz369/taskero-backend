import { Module } from '@nestjs/common';

import { HttpModule } from './http/http.module';
import { EnvModule } from 'src/shared/env/env.module';
import { ContextsModule } from 'src/contexts/contexts.module';
import { DatabaseModule } from 'src/shared/database/database.module';
import { JwtModule } from 'src/shared/jwt/jwt.module';

@Module({
  imports: [EnvModule, JwtModule, DatabaseModule, HttpModule, ContextsModule],
})
export class AppModule {}
