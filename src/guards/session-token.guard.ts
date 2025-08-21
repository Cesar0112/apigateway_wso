import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

import { Request } from 'express';
import { SessionData } from '../session/interfaces/session.interface';

@Injectable()
export class SessionTokenGuard implements CanActivate {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    const sessionID = req.sessionID;
    if (!sessionID) {
      throw new UnauthorizedException('No session token found');
    }

    try {
      // Verificar si el sessionID existe en SessionStore
      const sessionData = await this.cacheManager.get<string>(sessionID);
      if (!sessionData) {
        throw new UnauthorizedException('Invalid or expired session');
      }

      // Opcional: Verificar si la sesión ha expirado
      const session: SessionData = JSON.parse(sessionData) as SessionData;

      if (
        session.cookie.expires &&
        Date.now() > new Date(session.cookie.expires).getTime()
      ) {
        throw new UnauthorizedException('Session has expired');
      }

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired session');
    }
  }
}
