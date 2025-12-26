import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma';

import { PrismaUtil } from '../utils';
import { IEnvRepository } from 'src/shared/env/domain/env.repository';
import { ILoggerRepository } from 'src/shared/logger/domain/logger.repository';

export class PrismaRepository extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly _logger: ILoggerRepository,
    _env: IEnvRepository,
  ) {
    const adapter = new PrismaPg({ connectionString: _env.dataBaseUrl });
    super({ adapter });
  }

  get $utls() {
    return PrismaUtil;
  }

  /**
   * @description Connect to database postgresql
   * @date 2025-12-02 21:48:42
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @returns {Promise<void>}
   */
  async onModuleInit(): Promise<void> {
    try {
      await this.$connect();

      this._logger.log('Server prisma database connected POSTGRESQL', 'DatabaseApplication');
    } catch (error) {
      this._logger.error('Error connecting to server prisma database', 'DatabaseApplication');
      throw error;
    }
  }

  /**
   * @description Disconnect to database postgresql
   * @date 2025-12-02 21:48:29
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @returns {Promise<void>}
   */
  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
