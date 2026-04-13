import { Global, Module } from '@nestjs/common';
import { CacheModule as CacheModuleCustomer } from '@nestjs/cache-manager';

import { ICacheRepository } from './domain/cache.repository';
import { CacheRepository } from './infrastructure/persistences';
import { IEnvRepository } from '../env/domain/env.repository';
import KeyvRedis from '@keyv/redis';

@Global()
@Module({
  imports: [
    CacheModuleCustomer.registerAsync({
      useFactory: (envRepo: IEnvRepository) => {
        let redisUrl: string | null = null;
        const password = envRepo.get('REDIS_PASSWORD');
        if (password) redisUrl = `redis://:${password}@${envRepo.get('REDIS_HOST')}:${envRepo.get('REDIS_PORT')}/0`;
        else redisUrl = `redis://${envRepo.get('REDIS_HOST')}:${envRepo.get('REDIS_PORT')}/0`;

        if (!redisUrl) throw new Error('REDIS_URL is not defined');

        return { stores: [new KeyvRedis(redisUrl)] };
      },
      inject: [IEnvRepository],
    }),
  ],
  providers: [
    {
      provide: ICacheRepository,
      useClass: CacheRepository,
    },
  ],
  exports: [ICacheRepository],
})
export class CacheModule {}
