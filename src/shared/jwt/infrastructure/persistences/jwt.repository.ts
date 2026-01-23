import { JwtService } from '@nestjs/jwt';

import { IJwtRepository } from '../../domain/jwt.repository';
import { IEnvRepository } from 'src/shared/env/domain/env.repository';

export class JwtRepository implements IJwtRepository {
  /**
   * Creates an instance of JwtRepository.
   * @date 2026-01-23 08:34:40
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {JwtService} _jwtService
   * @param {IEnvRepository} _env
   */
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _env: IEnvRepository,
  ) {}

  /**
   * @description Generate token
   * @date 2026-01-23 08:37:40
   * @author Jogan Ortiz Muñoz
   *
   * @template {object} [T=any]
   * @param {T} payload
   * @returns {string}
   */
  generate<T extends object = any>(payload: T): string {
    return this._jwtService.sign<T>(payload, { secret: this._env.get('JWT_SECRET'), expiresIn: this._env.get('JWT_EXPIRES_IN') });
  }

  /**
   * @description Generate token refresh
   * @date 2026-01-23 08:37:49
   * @author Jogan Ortiz Muñoz
   *
   * @template {object} [T=any]
   * @param {T} payload
   * @returns {string}
   */
  generateRefresh<T extends object = any>(payload: T): string {
    return this._jwtService.sign<T>(payload, { secret: this._env.get('JWT_REFRESH_SECRET'), expiresIn: this._env.get('JWT_REFRESH_EXPIRES_IN') });
  }

  /**
   * @description verify jwt
   * @date 2026-01-23 08:37:58
   * @author Jogan Ortiz Muñoz
   *
   * @template {object} [T=any]
   * @param {string} token
   * @returns {T}
   */
  verify<T extends object = any>(token: string): T {
    return this._jwtService.verify<T>(token, { secret: this._env.get('JWT_SECRET') });
  }

  /**
   * @description Verify jwt refresh
   * @date 2026-01-23 08:38:14
   * @author Jogan Ortiz Muñoz
   *
   * @template {object} [T=any]
   * @param {string} token
   * @returns {T}
   */
  verifyRefresh<T extends object = any>(token: string): T {
    return this._jwtService.verify<T>(token, { secret: this._env.get('JWT_REFRESH_SECRET') });
  }
}
