import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

import { IJwtRepository } from 'src/shared/jwt/domain/jwt.repository';
import { NotUnauthorizedException } from '../../domain/exceptions';

@Injectable()
export class ConfirmGuard implements CanActivate {
  constructor(private readonly _jwtRepository: IJwtRepository) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const jwt = this.extractTokenFromHeader(request);

    if (!jwt) throw new NotUnauthorizedException();

    try {
      const payload = this._jwtRepository.verifyConfirmAccount(jwt);
      request.idUser = payload.sub;
    } catch {
      throw new NotUnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: FastifyRequest): string | undefined {
    const splitted = request.headers['authorization']?.split(' ') ?? [];
    if (!splitted || !splitted.length) return undefined;
    const [type, token] = splitted;
    return type === 'Bearer' ? token : undefined;
  }
}
