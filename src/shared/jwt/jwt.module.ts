import { Global, Module } from '@nestjs/common';
import { JwtModule as JwtModuleConfig, JwtService } from '@nestjs/jwt';

import { IJwtRepository } from './domain/jwt.repository';
import { IEnvRepository } from '../env/domain/env.repository';
import { JwtRepository } from './infrastructure/persistences/jwt.repository';

@Global()
@Module({
  imports: [JwtModuleConfig],
  providers: [
    {
      provide: IJwtRepository,
      useFactory: (jwtService: JwtService, env: IEnvRepository) => new JwtRepository(jwtService, env),
      inject: [JwtService, IEnvRepository],
    },
  ],
  exports: [IJwtRepository],
})
export class JwtModule {}
